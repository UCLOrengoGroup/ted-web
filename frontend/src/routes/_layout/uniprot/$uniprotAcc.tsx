import { useEffect, useState } from "react"
import {
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ViewIcon, DownloadIcon, QuestionIcon } from '@chakra-ui/icons'
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"

import { type ApiError, UniprotService, DomainSummaryPublicWithInteractions } from "../../../client"
import useCustomToast from "../../../hooks/useCustomToast"

import PDBeMolStarWrapper from "../../../components/Common/PDBeMolStarWrapper"
import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

export const Route = createFileRoute("/_layout/uniprot/$uniprotAcc")({
  component: UniprotAcc,
})

import { getQueryParamsFromChoppingString, getDomainAnnotationFromDomainSummary } from "../../../components/Utils/DomainSummary"
import UniprotEntryDataService from "../../../components/UniprotService/service"
import { UniprotData } from "../../../components/UniprotService/model"
import classes from './$uniprotAcc.module.css'
import ProteinSummaryFigure, { ProteinSummaryFigureProps } from "../../../components/Common/ProteinSummaryFigure"

import { AfChainId } from "../../../components/Common/models"

const API_BASE_URL = import.meta.env.VITE_API_URL

function ted_domain_to_id(ted_domain: string): string {
  const id_parts = ted_domain.split('_')
  return id_parts[id_parts.length - 1]
}

function ted_domain_to_afid(ted_id: string): AfChainId {
  const id_parts = ted_id.split('_').slice(0, -1)
  const af_id = id_parts?.join('_')
  return new AfChainId(af_id)
}

function get_cath_id_link(cath_id: string) {
  if (!cath_id || cath_id == "-") {
    return cath_id
  }
  return <Link href={`https://www.cathdb.info/version/latest/superfamily/${cath_id}`} isExternal>{cath_id} <ExternalLinkIcon mx="2px" /></Link>
}

function get_pae_color_scheme(pae_score: number) {
  if (pae_score < 2.5) {
    return "green"
  } else if (pae_score < 4.0) {
    return "yellow"
  } else {
    return "red"
  }
}

function get_plddt_color_scheme(plddt: number) {
  if (plddt < 50) {
    return "plddtVeryLow"
  } else if (plddt < 70) {
    return "plddtLow"
  } else if (plddt < 90) {
    return "plddtHigh"
  }
  else {
    return "plddtVeryHigh"
  }
}

function get_chainparse_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/chainparse/${uniprot_acc}`
}

function get_domainsummary_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/summary/${uniprot_acc}`
}

function UniprotAcc() {
  const showToast = useCustomToast()
  const { uniprotAcc } = Route.useParams()
  const [ plugin, setPlugin ] = useState<PDBeMolstarPlugin | null>(null)
  const [ highlightedDomainId, setHighlightedDomainId ] = useState<string | null>(null)
  const [ selectedDomainId, setSelectedDomainId ] = useState<string | null>(null)
  const [ uniprotEntry, setUniprotEntry ] = useState<UniprotData | null>(null)
  const [ uniprotDidLoad, setUniprotDidLoad ] = useState<boolean>(false)
  const domainSummaryResult = useQuery(["domainsummary", uniprotAcc], () => {
    return UniprotService.readUniprotSummary({
      uniprotAcc: uniprotAcc,
      limit: 50,
    })
  })
  const chainParseResult = useQuery(["chainparse", uniprotAcc], () => {
    return UniprotService.readChainparseByUniprot({
      uniprotAcc: uniprotAcc,
      limit: 50,
    })
  })

  const domain_summary_entries = domainSummaryResult.data
  const chain_parse_entries = chainParseResult.data

  const afId = `AF-${uniprotAcc}-F1-model_v4`

  if (domainSummaryResult.isError) {
    const errDetail = (domainSummaryResult.error as ApiError).body?.detail
    showToast("Something went wrong retrieving TED domains.", `${errDetail}`, "error")
  }
  if (chainParseResult.isError) {
    const errDetail = (chainParseResult.error as ApiError).body?.detail
    showToast("Something went wrong retrieving chain parses.", `${errDetail}`, "error")
  }

  useEffect(() => {
    if (!uniprotDidLoad) {
      // console.log("useEffect.UPDATE: ", uniprotAcc)
      UniprotEntryDataService.get(uniprotAcc).then((up_entry: UniprotData) => {
        // console.log("uniprot.data: ", up_entry);
        setUniprotEntry(up_entry);
      })
      setUniprotDidLoad(true)
    }
  }, [uniprotAcc])

  const selectChopping = (dom: DomainSummaryPublicWithInteractions) => {
    if (!plugin) return
    const params = getQueryParamsFromChoppingString(dom.chopping)
    setSelectedDomainId(dom.ted_id)
    plugin.visual.focus(params)
  }
  
  const unselectChopping = () => {
    if (!plugin) return
    plugin.visual.reset({ camera: true })
    setSelectedDomainId(null)
  }

  const highlightChopping = (dom: DomainSummaryPublicWithInteractions) => {
    if (!plugin) return
    const params = getQueryParamsFromChoppingString(dom.chopping)
    plugin.visual.highlight({ data: params })
    setHighlightedDomainId(dom.ted_id)
  }

  const unhighlightChopping = () => {
    if (!plugin) return
    plugin.visual.clearHighlight()
    setHighlightedDomainId(null)
  }

  const toggleSelectChopping = (dom: DomainSummaryPublicWithInteractions) => {
    unselectChopping()
    selectChopping(dom)
  }

  const onInitPlugin = (instance: PDBeMolstarPlugin) => {
    setPlugin(instance)
  }

  let summaryFigure = null
  let structureFigure = null
  if (uniprotEntry && domain_summary_entries) {
    const domain_annotations = domain_summary_entries.data.map((d) => getDomainAnnotationFromDomainSummary(d))
    const opts: ProteinSummaryFigureProps = {
      width: 500,
      height: 30,
      totalResidues: uniprotEntry.sequence.length,
      domainAnnotations: domain_annotations,
    }
    if (highlightedDomainId) {
      opts.highlightedDomainId = highlightedDomainId
    }
    summaryFigure = <ProteinSummaryFigure {...opts} />
    structureFigure = <PDBeMolStarWrapper 
      afdb={afId} 
      onInit={onInitPlugin}
      domainAnnotations={domain_annotations}
    />
  }

  let infoTable = null
  if (uniprotEntry) {
    infoTable = (
    <Flex>
    <Box width="70%">
      <dl>
        <dt>Accession</dt>
        <dd>{uniprotAcc}</dd>
        <dt>Name</dt>
        <dd>{uniprotEntry.proteinDescription.fullName}</dd>
        <dt>Length</dt>
        <dd>{uniprotEntry.sequence.length} Residues</dd>
        <dt>Organism</dt>
        <dd>{uniprotEntry.organism.scientificName}</dd>
        <dt>Lineage</dt>
        <dd>{uniprotEntry.organism.lineage.join(" > ")}</dd>
      </dl>
    </Box>
    <Box width="30%">
      <Heading as="h4" size="md" pb="4">External links</Heading>
      <List>
        <ListItem>
          <Link href={`https://alphafold.ebi.ac.uk/entry/${uniprotAcc}`} isExternal>AlphaFold DB <ExternalLinkIcon mx='2px' /></Link>
        </ListItem>
        <ListItem>
          <Link href={`https://www.uniprot.org/uniprotkb/${uniprotAcc}/entry`} isExternal>UniProt-KB <ExternalLinkIcon mx='2px' /></Link>
        </ListItem>
        <ListItem>
          <Link href={`https://www.ebi.ac.uk/interpro/search/text/${uniprotAcc}/`} isExternal>InterPro <ExternalLinkIcon mx='2px' /></Link>
        </ListItem>
      </List>
    </Box>
    </Flex>
    )
  }

  if (domainSummaryResult.isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh" width="full">
        <Spinner size="xl" color="ui.main" />
      </Flex>
    )
  }

  if (!domain_summary_entries) {
    return (
      <Flex justify="center" align="center" height="100vh" width="full">
        Sorry, no consensus TED domains found for '{uniprotAcc}'
      </Flex>
    )
  }

  const ted_id = domain_summary_entries?.data[0].ted_id
  const af_chain_id = ted_id ? ted_domain_to_afid(ted_id) : undefined

  // console.log("uniprotEntry: ", uniprotEntry)
  return (
    <>
      <Container maxWidth={"120ch"}>
        <Stack spacing={6} align='stretch' pt={12}>
          <Box>
            <Heading as="h1" pb={4}>
              {af_chain_id ? (
                <>{af_chain_id.uniprot_acc} {af_chain_id && <Text as="span" fontSize="md">(AlphaFold, fragment: {af_chain_id?.fragment}, version: {af_chain_id?.version})</Text>}</>
              ) : (
                <>Loading...</>
              )
              }
            </Heading>
            <Text fontSize="lg">
            TED domains from AlphaFold structure prediction: {af_chain_id?.id}
            </Text>
          </Box>
            
          <Divider />

          <Box>
            <Heading as="h2" size="lg">
              Information
            </Heading>
            {infoTable}
          </Box>

          <Flex height="50vh" position="relative">
            <Box maxW="lg" maxH="sm" id="molstar-view">
              {structureFigure}
            </Box>
          </Flex>

          <Divider />
          
          <Box>
            <Heading as="h2" size="lg">
              TED Consensus Domains <Badge p={2}>{domain_summary_entries.data.length}</Badge>

              <Link px="6" href={get_domainsummary_data_link(uniprotAcc)}>
                <IconButton 
                    aria-label="Download Domain Summary Data"
                    title="Download Domain Summary Data"
                    icon={<DownloadIcon/>}>
                </IconButton>
              </Link>

            </Heading>
            <Center>
              <Box p="2em">
                {summaryFigure}
              </Box>
            </Center>

            <TableContainer>
              <Table size={"sm"}>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Domain</Th>
                    <Th>Boundaries</Th>
                    <Th>CATH
                      <Tooltip hasArrow label="The annotation of CATH labels in TED differs from the standard CATH protocol for 
            superfamily assignment, which involves additional HMM-based protocols and manual curation 
            for remote matches.">
                        <QuestionIcon />
                      </Tooltip>
                    </Th>
                    <Th>Residues</Th>
                    <Th>Av pLDDT</Th>
                    <Th>Packing</Th>
                    <Th>Globularity</Th>
                    <Th>Interactions</Th>
                    <Th>PDB</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {domain_summary_entries?.data.map((item) => (
                    <Tr key={item.ted_id} 
                        onMouseOver={() => highlightChopping(item)} 
                        onMouseOut={() => unhighlightChopping()}
                        onClick={() => toggleSelectChopping(item)}
                        className={
                          (selectedDomainId === item.ted_id ? classes.selected : "") + " " + 
                          (highlightedDomainId === item.ted_id ? classes.highlighted : "")}
                        >
                      <Td><IconButton 
                            aria-label="View Domain"
                            colorScheme={highlightedDomainId === item.ted_id ? "blue" : "gray"}
                            onClick={(e) => {e.preventDefault()}}
                            icon={<ViewIcon/>} />
                      </Td>
                      <Td>{ted_domain_to_id(item.ted_id)}</Td>
                      <Td>{item.chopping}</Td>
                      <Td>{get_cath_id_link(item.cath_label)}</Td>
                      <Td>{item.nres_domain}</Td>
                      <Td><Badge variant={get_plddt_color_scheme(item.plddt)}>{item.plddt.toFixed(1)}</Badge></Td>
                      <Td>{item.packing_density.toFixed(1)}</Td>
                      <Td>{item.norm_rg.toFixed(3)}</Td>
                      <Td>
                        <List>

                        { item.interactions?.map((interaction) => {
                          const pair_id = interaction.ted_id1 === item.ted_id ? interaction.ted_id2 : interaction.ted_id1
                          return(
                            <ListItem>{ted_domain_to_id(pair_id)} <Badge colorScheme={get_pae_color_scheme(interaction.pae_score)}>{interaction.pae_score.toFixed(1)}</Badge></ListItem>
                          )
                        })}
                        </List>
                      </Td>
                      <Td>
                        <Link href={`${API_BASE_URL}/api/v1/files/${item.ted_id}.pdb`}>
                              <IconButton 
                                  aria-label="Download PDB"
                                  title="Download PDB"
                                  icon={<DownloadIcon/>}/>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Divider />

          <Box>
            <Heading as="h2" size="lg" pb="6">
              TED Results <Badge p={2}>{chain_parse_entries?.data.length}</Badge>

              <Link px="6" href={get_chainparse_data_link(uniprotAcc)}>
                <IconButton 
                    aria-label="Download results from individual methods"
                    title="Download results from individual methods"
                    icon={<DownloadIcon/>}/>
              </Link>

            </Heading>

            <TableContainer>
              <Table size={"sm"}>
                <Thead>
                  <Tr>
                    <Th>Method</Th>
                    <Th>Domains</Th>
                    <Th>Boundaries</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {chain_parse_entries?.data.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.method}</Td>
                      <Td>{item.num_domains}</Td>
                      <Td>{item.chopping}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Container>
    </>
    )
}

export default UniprotAcc

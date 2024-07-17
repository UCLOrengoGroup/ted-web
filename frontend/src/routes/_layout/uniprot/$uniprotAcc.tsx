import { useEffect, useState } from "react"
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ViewIcon } from '@chakra-ui/icons'
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

function ted_domain_to_id(ted_domain: string) {
  const id_parts = ted_domain.split('_')
  return id_parts[id_parts.length - 1]
}

function UniprotAcc() {
  const showToast = useCustomToast()
  const { uniprotAcc } = Route.useParams()
  const [ plugin, setPlugin ] = useState<PDBeMolstarPlugin | null>(null)
  const [ highlightedDomainId, setHighlightedDomainId ] = useState<string | null>(null)
  const [ selectedDomainId, setSelectedDomainId ] = useState<string | null>(null)
  const [ uniprotEntry, setUniprotEntry ] = useState<UniprotData | null>(null)
  const [ uniprotDidLoad, setUniprotDidLoad ] = useState<boolean>(false)
  const {
    data: domain_summary_entries,
    error,
    isLoading,
    isError,
  } = useQuery("domainsummary", () => {
    return UniprotService.readUniprotSummary({
      uniprotAcc: uniprotAcc,
      limit: 50,
    })
  })

  const afId = `AF-${uniprotAcc}-F1-model_v4`

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
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
          <Link href={`https://www.ebi.ac.uk/interpro/search/text/${uniprotAcc}/`} isExternal>Interpro <ExternalLinkIcon mx='2px' /></Link>
        </ListItem>
      </List>
    </Box>
    </Flex>
    )
  }

  if (isLoading) {
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

  // console.log("uniprotEntry: ", uniprotEntry)
  return (
    <>
      <Container maxWidth={"120ch"}>
        <Heading
          as="h1"
          textAlign={{ base: "center", md: "left" }}
          pt={12}
        >
        TED Domains: {uniprotAcc}
      </Heading>

        {infoTable}

        <Flex height="50vh" position="relative" margin="1em 0">
          <Box maxW="lg" maxH="sm" id="molstar-view">
            {structureFigure}
          </Box>
        </Flex>

        <Heading as="h2">
          TED Consensus Domains ({domain_summary_entries.data.length})
        </Heading>
        
        <Center>
          <Box p="2em">
            {summaryFigure}
          </Box>
        </Center>

        <TableContainer>
          <Table size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Domain</Th>
                <Th>Boundaries</Th>
                <Th>CATH</Th>
                <Th>Residues</Th>
                <Th>Av pLDDT</Th>
                <Th>Packing Density</Th>
                <Th>Interactions (PAE)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {domain_summary_entries.data.map((item) => (
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
                        icon={<ViewIcon/>} /></Td>
                  <Td>{ted_domain_to_id(item.ted_id)}</Td>
                  <Td>{item.chopping}</Td>
                  <Td>{item.cath_label}</Td>
                  <Td>{item.nres_domain}</Td>
                  <Td>{item.plddt}</Td>
                  <Td>{item.packing_density}</Td>
                  <Td>
                    <List>

                    { item.interactions?.map((interaction) => {
                      const pair_id = interaction.ted_id1 === item.ted_id ? interaction.ted_id2 : interaction.ted_id1
                      return(
                        <ListItem>{ted_domain_to_id(pair_id)} ({interaction.pae_score})</ListItem>
                      )
                    })}
                    </List>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer> 
      </Container>
    </>
    )
}

export default UniprotAcc

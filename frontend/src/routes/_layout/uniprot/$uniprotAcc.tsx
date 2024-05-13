import { useEffect, useState } from "react"
import {
  Center,
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ViewIcon } from '@chakra-ui/icons'
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"

import { type ApiError, UniprotService, DomainSummary } from "../../../client"
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
import { getColourByIndex } from "../../../components/Common/DomainColors"

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

  const selectChopping = (dom: DomainSummary) => {
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

  const highlightChopping = (dom: DomainSummary) => {
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

  const toggleSelectChopping = (dom: DomainSummary) => {
    if (selectedDomainId === dom.ted_id) {
      unselectChopping()
    }
    else{
      selectChopping(dom)
    }
  }

  const onInitPlugin = (instance: PDBeMolstarPlugin) => {
    setPlugin(instance)
  }

  let summaryFigure = null;
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
    infoTable = <Box>
      <dl>
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
  }

  // console.log("uniprotEntry: ", uniprotEntry)
  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        domain_summary_entries && (
          <Container maxWidth={"120ch"}>
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              UniProt: {uniprotAcc}
            </Heading>

            {infoTable}

            <Flex height="50vh" position="relative" margin="1em 0 0">
              <Box maxW="lg" maxH="sm" id="molstar-view">
                {structureFigure}
              </Box>
            </Flex>
            
            <Box margin="1em 0 0">
              <Center>
                {summaryFigure}
              </Center>
            </Box>

            <Heading size="md" pt={12}>
              Consensus Domains ({domain_summary_entries.data.length})
            </Heading>

            <TableContainer margin="1em 0 0" >
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>Domain</Th>
                    <Th>Boundaries</Th>
                    <Th>CATH</Th>
                    <Th>Residues</Th>
                    <Th>Av pLDDT</Th>
                    <Th>Packing Density</Th>
                    <Th>Focus</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {domain_summary_entries.data.map((item, domain_idx) => (
                    <Tr key={item.ted_id} 
                        onMouseOver={() => highlightChopping(item)} 
                        onMouseOut={() => unhighlightChopping()}
                        onClick={() => toggleSelectChopping(item)}
                        className={
                          (selectedDomainId === item.ted_id ? classes.selected : "") + " " + 
                          (highlightedDomainId === item.ted_id ? classes.highlighted : "")} 
                        style={{ borderWidth: "0 0 0 1em", borderStyle: "solid", borderColor: getColourByIndex(domain_idx)}}
                        >
                      <Td>{domain_idx + 1}</Td>
                      <Td>{item.chopping}</Td>
                      <Td>{item.cath_label}</Td>
                      <Td>{item.nres_domain}</Td>
                      <Td>{item.plddt}</Td>
                      <Td>{item.packing_density}</Td>
                      <Td><IconButton 
                            aria-label="View Domain"
                            colorScheme={selectedDomainId === item.ted_id ? "blue" : "gray"}
                            onClick={(e) => {e.preventDefault()}}
                            icon={<ViewIcon/>} /></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        )
      )}
    </>
  )
}

export default UniprotAcc

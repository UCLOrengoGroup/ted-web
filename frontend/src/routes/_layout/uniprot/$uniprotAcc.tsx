import { useState } from "react"
import {
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

// import MolStarWrapper from "../../../components/Common/MolStarWrapper"
import PDBeMolStarWrapper from "../../../components/Common/PDBeMolStarWrapper"
import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

export const Route = createFileRoute("/_layout/uniprot/$uniprotAcc")({
  component: UniprotAcc,
})

import classes from './$uniprotAcc.module.css'

export const COLOURS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FF8000",
  "#FF0080",
  "#80FF00",
  "#80FF00",
  "#0080FF",
  "#8000FF",
  "#FF8080",
  "#80FF80",
  "#8080FF",
  "#FF80FF",
  "#80FFFF",
  "#FFFF80",
]

function UniprotAcc() {
  const showToast = useCustomToast()
  const { uniprotAcc } = Route.useParams()
  const [ plugin, setPlugin ] = useState<PDBeMolstarPlugin | null>(null)
  const [ highlightedDomainId, setHighlightedDomainId ] = useState<string | null>(null)
  const [ selectedDomainId, setSelectedDomainId ] = useState<string | null>(null)
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
  const afPdbUrl = afId ? `https://alphafold.ebi.ac.uk/files/${afId}.pdb` : null

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  const getQueryParamsFromChopping = (chopping: string) => {
    const segs_strs = chopping.split("_")
    return segs_strs.map((seg_str) => {
      const [start_str, end_str] = seg_str.split("-")
      const start = parseInt(start_str)
      const end = parseInt(end_str)
      return { 
        start: start, 
        end: end,
        start_residue_number: start,
        end_residue_number: end,
        start_uniprot_residue_number: start,
        end_uniprot_residue_number: end,
      }
    })
  }

  const selectChopping = (dom: DomainSummary) => {
    if (!plugin) return
    const params = getQueryParamsFromChopping(dom.chopping)
    setSelectedDomainId(dom.ted_id)
    plugin.visual.select({ data: params })
  }
  
  const unselectChopping = () => {
    if (!plugin) return
    plugin.visual.clearSelection()
    setSelectedDomainId(null)
  }

  const highlightChopping = (dom: DomainSummary) => {
    if (!plugin) return
    const params = getQueryParamsFromChopping(dom.chopping)
    plugin.visual.highlight({ data: params })
    setHighlightedDomainId(dom.ted_id)
  }

  const unhighlightChopping = () => {
    if (!plugin) return
    plugin.visual.clearHighlight()
    setHighlightedDomainId(null)
  }

  const toggleSelectChopping = (dom: DomainSummary) => {
    unselectChopping()
    selectChopping(dom)
  }

  const onInitPlugin = (instance: PDBeMolstarPlugin) => {
    setPlugin(instance)
  }

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

            <Flex height="50vh" position="relative" margin="2em 0">
              <Box maxW="lg" maxH="sm" id="molstar-view">
                {afPdbUrl && <PDBeMolStarWrapper 
                  afdb={afId} 
                  onInit={onInitPlugin} />}
              </Box>
            </Flex>

            <Heading size="md" pt={12}>
              TED Consensus Domains ({domain_summary_entries.data.length})
            </Heading>

            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Boundaries</Th>
                    <Th>CATH</Th>
                    <Th>Residues</Th>
                    <Th>Av pLDDT</Th>
                    <Th>Packing Density</Th>
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
                      <Td>{item.chopping}</Td>
                      <Td>{item.cath_label}</Td>
                      <Td>{item.nres_domain}</Td>
                      <Td>{item.plddt}</Td>
                      <Td>{item.packing_density}</Td>
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

import {
  Box,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"

import { type ApiError, UniprotService } from "../../../client"
import useCustomToast from "../../../hooks/useCustomToast"

// import MolStarWrapper from "../../../components/Common/MolStarWrapper"
import PDBeMolStarWrapper from "../../../components/Common/PDBeMolStarWrapper"

export const Route = createFileRoute("/_layout/uniprot/$uniprotAcc")({
  component: UniprotAcc,
})

function UniprotAcc() {
  const showToast = useCustomToast()
  const { uniprotAcc } = Route.useParams()
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
                {afPdbUrl && <PDBeMolStarWrapper afdb={afId} />}
              </Box>
            </Flex>

            <Heading size="md" pt={12}>
              TED Consensus Domains ({domain_summary_entries.data.length})
            </Heading>

            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>CATH</Th>
                    <Th>Boundaries</Th>
                    <Th>Residues</Th>
                    <Th>pLDDT</Th>
                    <Th>Packing Density</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {domain_summary_entries.data.map((item) => (
                    <Tr key={item.ted_id}>
                      <Td>{item.ted_id}</Td>
                      <Td>{item.cath_label}</Td>
                      <Td>{item.chopping}</Td>
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

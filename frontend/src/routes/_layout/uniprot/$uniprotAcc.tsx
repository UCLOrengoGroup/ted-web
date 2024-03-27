import {
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

export const Route = createFileRoute("/_layout/uniprot/$uniprotAcc")({
    loader: ({ params }) => {
        console.log("uniprot.loader: ", params.uniprotAcc)
        const query = useQuery("domainsummary", () => UniprotService.readUniprotSummary({ uniprotAcc: params.uniprotAcc, limit: 50 }))
        return query
    },
    component: UniprotAcc,
})

function UniprotAcc() {
  const showToast = useCustomToast()
  const { uniprotAcc } = Route.useParams()
  const { data: domain_summary_entries, isLoading, isError, error } = Route.useLoaderData()

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
              UniProt: { uniprotAcc }
            </Heading>
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>CATH</Th>
                    <Th>Chopping</Th>
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

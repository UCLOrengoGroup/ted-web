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

import { type ApiError, UniprotService } from "../../client"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/search")({
  component: Search,
})

function Search() {
  const showToast = useCustomToast()
  const {
    data: uniprot_summary_entries,
    isLoading,
    isError,
    error,
  } = useQuery("items", () => UniprotService.readUniprotSummary({ uniprotAcc: "P12345", skip: 1, limit: 10 })

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
        uniprot_summary_entries && (
          <Container>
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              Search
            </Heading>
            <Navbar type={"Item"} />
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Start</Th>
                    <Th>End</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {uniprot_summary_entries.structures?.map((item) => (

                    <Tr key={item.summary.model_identifier}>
                      <Td>{item.summary.model_identifier}</Td>
                      <Td>{item.summary.uniprot_start}</Td>
                      <Td>{item.summary.uniprot_end}</Td>
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

export default Search

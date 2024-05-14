import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useQuery, useQueryClient } from "react-query"

import { type ApiError, UniprotService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/search")({
  component: Search,
})

interface SearchForm {
  query: string
}

function SearchBar({
  onSubmitQuery,
}: { onSubmitQuery: (query: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      query: "",
    },
  })

  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    onSubmitQuery(data.query)
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <InputGroup>
            <Input
              id="query"
              placeholder="Enter UniProt ID e.g. A0A001"
              {...register("query", {
                required: "This field is required",
              })}
            />
            <InputRightAddon>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputRightAddon>
            <FormErrorMessage>{errors.query?.message}</FormErrorMessage>
          </InputGroup>
        </FormControl>
      </form>
    </Stack>
  )
}

function fetchDomainSummary(query: string) {
  if (!query) {
    return null
  }
  return UniprotService.readUniprotSummary({ uniprotAcc: query, limit: 50 })
}

function Search() {
  const showToast = useCustomToast()
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const queryClient = useQueryClient()
  const {
    data: domain_summary_entries,
    error,
    isError,
    isLoading,
  } = useQuery(["search", searchQuery], () => fetchDomainSummary(searchQuery))

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  function handleSearchSubmit(_search_query: string) {
    queryClient.invalidateQueries("search")
    setSearchQuery(_search_query)
  }

  function tedToAf(ted_id: string) {
    return ted_id.substring(0, ted_id.lastIndexOf("_"))
  }

  const first_entry = domain_summary_entries?.data[0]
  const uniprot_items = first_entry ? [first_entry] : []
  const ted_count = domain_summary_entries ? domain_summary_entries.count : 0

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        uniprot_items && (
          <Container maxWidth={"100ch"}>
            <Stack spacing={3}>
              <Heading
                margin="0.5em 0 0"
                size="lg"
                textAlign={{ base: "center", md: "left" }}
                pt={12}
              >
                Search{searchQuery && ":"} {searchQuery}
              </Heading>
              <Box margin="0.5em 0 0">
                <SearchBar
                  onSubmitQuery={(query) => {
                    return handleSearchSubmit(query)
                  }}
                />
              </Box>
              <Text margin="0.5em 0 0">
                {uniprot_items.length} AlphaFold entries found ({ted_count} TED
                domains)
              </Text>
              <TableContainer>
                <Table size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>AlphaFold ID</Th>
                      <Th>UniProt</Th>
                      <Th>Taxonomy</Th>
                      <Th>TED Domains</Th>
                      <Th>Link</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {uniprot_items.map((item) => (
                      <Tr key={item.uniprot_acc}>
                        <Td>{tedToAf(item.ted_id)}</Td>
                        <Td>{item.uniprot_acc}</Td>
                        <Td>
                          <Stack>
                            <Text>{item.tax_scientific_name}</Text>
                            {/* <Text fontSize="xs">{item.tax_lineage.split(',').join(" > ")}</Text> */}
                          </Stack>
                        </Td>
                        <Td>{ted_count}</Td>
                        <Td>
                          <Button variant="primary">
                            <Link
                              as={RouterLink}
                              to={`/uniprot/${item.uniprot_acc}`}
                            >
                              Go
                            </Link>
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Container>
        )
      )}
    </>
  )
}

export default Search

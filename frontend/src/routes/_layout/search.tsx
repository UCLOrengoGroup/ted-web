import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Link,
  Flex,
  Heading,
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
  InputRightAddon
} from "@chakra-ui/react"
import React from "react"
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, UniprotService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/search")({
  component: Search,
})

interface SearchForm {
  query: string
}

function SearchBar( {onSubmitQuery}: {onSubmitQuery: (query: string) => void}){
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
    console.log("SearchBar.onSubmit", data)
    onSubmitQuery(data.query)
    console.log("SearchBar.onSubmitQuery", onSubmitQuery)
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
            <FormErrorMessage>{errors.query && errors.query.message}</FormErrorMessage>          
          </InputGroup>
        </FormControl>
      </form>
    </Stack>
  )
}

function fetchDomainSummary(query: string) {
  console.log("fetchDomainSummary.query: ", query)
  if (!query) {
    return null
  }
  return UniprotService.readUniprotSummary({ uniprotAcc: query, limit: 50 })
}

function Search() {
  const showToast = useCustomToast()

  const [searchQuery, setSearchQuery] = React.useState<string>("")

  console.log("Search.searchQuery: ", searchQuery)

  const queryClient = useQueryClient()
  const query = useQuery("search", () => fetchDomainSummary(searchQuery))

  const { data: domain_summary_entries, error, isError, isLoading } = query || {}

  console.log("Search.data: ", domain_summary_entries)

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  function handleSearchSubmit( _search_query: string) {
    console.log("Search.handleSearchSubmit: ", _search_query)
    queryClient.invalidateQueries("search")
    setSearchQuery(_search_query)
  }

  function tedToAf(ted_id: string) {
    return ted_id.substring(0, ted_id.lastIndexOf('_'))
  }

  const first_entry = domain_summary_entries?.data[0]
  const uniprot_items = first_entry ? [first_entry] : []
  const af_id = first_entry ? tedToAf(first_entry.ted_id) : null
  const uniprot_acc = first_entry?.uniprot_acc
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
              <SearchBar onSubmitQuery={(query) => {
                console.log("SearchBar.onSubmitQuery", query)
                return handleSearchSubmit(query)
              }}/>
              <Heading
                size="lg"
                textAlign={{ base: "center", md: "left" }}
                pt={12}
              >
                Search { searchQuery }
              </Heading>
              <Text>
                { uniprot_items.length } AlphaFold entries found ({ted_count} TED domains)
              </Text>
              <TableContainer>
                <Table size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>UniProt</Th>
                      <Th>AlphaFold ID</Th>
                      <Th>TED Domains</Th>
                      <Th>Link</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {uniprot_items.map((_item) => (
                      <Tr key={uniprot_acc}>
                        <Td>{af_id}</Td>
                        <Td>{uniprot_acc}</Td>
                        <Td>{ted_count}</Td>
                        <Td>
                          <Button><Link as={RouterLink} to={`/uniprot/${uniprot_acc}`}>Go</Link></Button>
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

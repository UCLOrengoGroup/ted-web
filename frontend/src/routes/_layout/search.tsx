import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Flex,
  Link,
  Heading,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  InputRightAddon
} from "@chakra-ui/react"
import React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, UniprotService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

export const Route = createFileRoute("/_layout/search")({
  component: Search,
})

interface SearchForm {
  query: string
}

function SearchBar() {
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

  const [_query, setQuery] = React.useState<string>("")

  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    console.log("data", data)
    setQuery(data.query)
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <InputGroup>
            <Input
              id="query"
              placeholder="Enter UniProt ID"
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

function Search() {
  const showToast = useCustomToast()

  const uniprotAcc: string = 'A0A001'
  const {
    data: domain_summary_entries,
    isLoading,
    isError,
    error,
  } = useQuery("domainsummary", () => UniprotService.readUniprotSummary({ uniprotAcc: uniprotAcc, skip: 1, limit: 50 }))

  if (isError) {
    const errDetail = (error as ApiError).body?.detail
    showToast("Something went wrong.", `${errDetail}`, "error")
  }

  const uniprot_items = [domain_summary_entries?.data[0]]
  const uniprot_acc = domain_summary_entries?.data[0].uniprot_acc
  const ted_count = domain_summary_entries?.count

  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        uniprot_items && (
            <Container maxWidth={"120ch"}>
              <SearchBar />
              <Heading
                size="lg"
                textAlign={{ base: "center", md: "left" }}
                pt={12}
              >
                Search: { uniprotAcc }
              </Heading>
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>UniProt</Th>
                    <Th>TED Domains</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {uniprot_items.map((_item) => (
                    <Tr key={uniprot_acc}>
                      <Td>{uniprot_acc}</Td>
                      <Td>{ted_count}</Td>
                      <Td><Link href={`/uniprot/${uniprot_acc}`}>Go</Link></Td>
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

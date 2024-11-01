import { Search2Icon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Link,
  LinkBox,
  LinkOverlay,
  Spinner,
  Stack,
  Text,
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

import classes from "./search.module.css"

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
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.600" />}
            />
            <Input
              id="query"
              placeholder="Enter UniProt ID e.g. A0A000, A0A1V6M2Y0"
              {...register("query", {
                required: "This field is required",
              })}
            />
            <InputRightAddon p={0} border="none">
              <Button variant="primary" type="submit" borderLeftRadius={0}>
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

  function handleUniprotEntryClick(uniprot_acc: string) {
    setSearchQuery(uniprot_acc)
  }

  function handleSearchSubmit(_search_query: string) {
    queryClient.invalidateQueries("search")
    setSearchQuery(_search_query)
  }

  function tedToAf(ted_id: string) {
    return ted_id.substring(0, ted_id.lastIndexOf("_"))
  }

  function formatTaxName(tax_scientific_name: string) {
    return tax_scientific_name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  const first_entry = domain_summary_entries?.data[0]
  const uniprot_items = domain_summary_entries
    ? first_entry
      ? [first_entry]
      : []
    : null
  const ted_count = domain_summary_entries ? domain_summary_entries.count : 0

  function getSearchMessage() {
    if (uniprot_items == null) {
      return (
        <Text>
          Enter a UniProt accession into the search bar (e.g.{" "}
          <Link onClick={() => handleUniprotEntryClick("A0A000")}>A0A000</Link>,{" "}
          <Link onClick={() => handleUniprotEntryClick("A0A1V6M2Y0")}>
            A0A1V6M2Y0
          </Link>
          )
        </Text>
      )
    }
    if (uniprot_items.length === 0) {
      return (
        <Text>Sorry, no consensus TED domains found for '{searchQuery}'</Text>
      )
    }
    return (
      <Text>
        {uniprot_items.length} AlphaFold entries found for '{searchQuery}' (
        {ted_count} TED domains)
      </Text>
    )
  }
  return (
    <>
      {isLoading ? (
        // TODO: Add skeleton
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
      ) : (
        <Container maxWidth={"100ch"}>
          <Stack spacing={9}>
            <Heading
              margin="0.5em 0 0"
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12}
            >
              Search TED
            </Heading>
            <SearchBar
              onSubmitQuery={(query) => {
                return handleSearchSubmit(query)
              }}
            />
            {getSearchMessage()}
            {uniprot_items?.length && (
              <Stack gap="4">
                {uniprot_items.map((item) => (
                  <LinkBox>
                    <Card>
                      <CardBody>
                        <Heading as="h3" size="sm" pb={4} color="blue.400" textDecoration="underline">
                          <LinkOverlay as={RouterLink} to={`/uniprot/${item.uniprot_acc}`}>{tedToAf(item.ted_id)}</LinkOverlay>
                        </Heading>
                        <Stack gap="2">
                          <Flex>
                            <Box className={classes.dataKey}>TED Consensus Domains</Box>
                            <Box className={classes.dataValue}>{ted_count}</Box>
                          </Flex>
                          <Flex>
                            <Box className={classes.dataKey}>Source Organism</Box>
                            <Box className={classes.dataValue}>{formatTaxName(item.tax_scientific_name)}</Box>
                          </Flex>
                        </Stack>
                      </CardBody>
                    </Card>
                  </LinkBox>
                ))}
              </Stack>
            )}
          </Stack>
        </Container>
      )}
    </>
  )
}

export default Search

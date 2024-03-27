import {
  Container,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
  Text,
  Link,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/data")({
  component: Data,
})

function Data() {

  return (
    <>
        <Container maxWidth={"100ch"}>
          <Stack spacing={3}>
          <Heading
            size="lg"
            textAlign={{ base: "center", md: "left" }}
            pt={12}
          >
            Data Availability
          </Heading>
          <Text>
            All TED data is freely available via download and API. All software and tools
            are open source and available on GitHub.
          </Text>
          <Heading size="m">
            File Downloads
          </Heading>
          <UnorderedList>
            <ListItem>Zenodo: <Link href="https://doi.org/10.5281/zenodo.10848710">doi.org/10.5281/zenodo.10848710</Link></ListItem>
          </UnorderedList>
          <Heading size="m">
            API
          </Heading>
          <UnorderedList>
            <ListItem><Link href="/docs">OpenAPI Documentation</Link></ListItem>
          </UnorderedList>
          <Heading size="m">
            Software
          </Heading>
          <UnorderedList>
            <ListItem><Link href="https://github.com/UCLOrengoGroup/cath-alphaflow">CATH-AlphaFlow</Link> - tools and workflows to process AlphaFold data</ListItem>
            <ListItem>TED supplementary - extra tools and script used in TED</ListItem>
          </UnorderedList>
        </Stack>
      </Container>
    </>
  )
}

export default Data

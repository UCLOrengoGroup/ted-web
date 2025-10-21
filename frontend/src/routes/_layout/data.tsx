import {
  Container,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
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
          <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
            Data Availability
          </Heading>
          <Text>
            All TED data is freely available via download and API. All software
            and tools are open source and available on GitHub.
          </Text>
          <Heading size="m">File Downloads</Heading>
          <UnorderedList>
            <ListItem>
              Zenodo:{" "}
              <Link href="https://zenodo.org/doi/10.5281/zenodo.10788941">
                doi.org/10.5281/zenodo.10788941
              </Link>
            </ListItem>
          </UnorderedList>
          <Heading size="m">Data</Heading>
          <UnorderedList>
            <ListItem>
              <Link href="/docs">API (OpenAPI Documentation)</Link>
            </ListItem>
          </UnorderedList>
          <Heading size="m">Software</Heading>
          <UnorderedList>
            <ListItem>
              <Link href="https://github.com/psipred/ted-tools">PSIPRED</Link> -
              code for calculating consensus domain chopping, domain quality,
              Foldclass embedding, search, and GO term analysis.
            </ListItem>
            <ListItem>
              <Link href="https://github.com/UCLOrengoGroup/cath-alphaflow">
                CATH-AlphaFlow
              </Link>{" "}
              - tools and workflows to process AlphaFold data (including
              calculation of globularity and packing density).
            </ListItem>
            <ListItem>
              <Link href="https://github.com/UCLOrengoGroup/ted-web">
                TED Web
              </Link>{" "}
              - code for this website.
            </ListItem>
          </UnorderedList>

          <Heading size="m">Domain segmentation methods</Heading>
          <UnorderedList>
            <ListItem>
              Chainsaw — deep learning domain segmentation: {" "}
              <Link href="https://github.com/JudeWells/chainsaw">GitHub</Link>
            </ListItem>
            <ListItem>
              Merizo — invariant point attention–based segmentation: {" "}
              <Link href="https://github.com/psipred/Merizo">GitHub</Link>
            </ListItem>
            <ListItem>
              UniDoc (NDR) — distance-matrix–based parsing: {" "}
              <Link href="http://yanglab.nankai.edu.cn/UniDoc/">Download page</Link>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Container>
    </>
  )
}

export default Data

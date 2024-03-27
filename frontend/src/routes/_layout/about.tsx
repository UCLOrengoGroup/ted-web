import { Container, Heading, Stack, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
  component: About,
})

function About() {
  return (
    <>
      <Container maxWidth={"100ch"}>
        <Stack spacing={3}>
          <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
            About TED
          </Heading>
          <Heading size="m">
            Exploring structural diversity across the protein universe
          </Heading>
          <Text>
            The AlphaFold Protein Structure Database (AFDB) contains full-length
            predictions of the three-dimensional structures of almost every
            protein in UniProt. Because protein function is closely linked to
            structure, the AFDB is poised to revolutionise our understanding of
            biology, evolution and more. Protein structures are composed of
            domains, independently folding units that can be found in multiple
            structural contexts and functional roles. The AFDB's potential
            remains untapped due to the difficulty of characterising 200 million
            structures.
          </Text>
          <Text>
            Here we present The Encyclopedia of Domains or TED, which combines
            state-of-the-art deep learning-based domain parsing and structure
            comparison algorithms to segment and classify domains across the
            whole AFDB. TED describes over 370 million domains, over 100 million
            more than detectable by sequence-based methods. Nearly 80% of TED
            domains share similarities to known superfamilies in CATH, greatly
            expanding the set of known protein structural domains.
          </Text>
          <Text>
            We uncover over 10,000 previously unseen structural interactions
            between superfamilies, expand domain coverage to over 1 million
            taxa, and unveil thousands of architectures and folds across the
            unexplored continuum of protein fold space. We expect TED to be a
            valuable resource that provides a functional interface to the AFDB,
            empowering it to be useful for a multitude of downstream analyses.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

export default About

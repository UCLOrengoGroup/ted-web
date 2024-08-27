import { Container, Heading, Stack, Text, Link, UnorderedList, ListItem } from "@chakra-ui/react"
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
            What is TED?
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
            whole AFDB. TED describes nearly 365 million domains, over 100 million
            more than detectable by sequence-based methods. Nearly 77% of TED
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
          <Heading size="m">
            People
          </Heading>
          <Text>
            TED is built and maintained by the Structural Bioinformatics groups of 
            {" "}<Link href="http://www0.cs.ucl.ac.uk/staff/d.jones/">Prof. David Jones</Link>{" "}
            and {" "}<Link href="https://www.ucl.ac.uk/orengo-group/">Prof. Christine Orengo</Link>{" "}
            at University College London, UK. 
          </Text>

          <Heading size="m">
            CATH Labels
          </Heading>
          <Text>
            CATH annotations have been assigned using the FoldSeek algorithm applied in various modes 
            and the FoldClass algorithm, both of which are used to report significant structural 
            similarity to a known CATH domain.             
          </Text>
          <Text>
            <strong>Note: The TED protocol differs from the standard CATH Assignment protocol for 
            superfamily assignment, which involves additional HMM-based protocols and manual curation 
            for remote matches.</strong>
          </Text>

          <Heading size="m">
            Resources
          </Heading>
          <Text>
            TED uses data from the following resources:
            <UnorderedList>
              <ListItem><Link href="https://alphafold.ebi.ac.uk/">AlphaFold DB</Link> - protein structure predictions</ListItem>
              <ListItem><Link href="https://uniprot.org">UniProt</Link> - protein sequence and functional information</ListItem>
              <ListItem><Link href="https://www.cathdb.info">CATH</Link> - classification of protein domains</ListItem>
            </UnorderedList>
          </Text>

          <Heading size="m">
            Funding
          </Heading>
          <Text>
            TED is funded by BBSRC grant BB/T019409/1 (A.M.L. and D.T.J.), 
            BB/W008556/1 (S.M.K. and D.T.J.) and BB/W018802/1 (I.S), Wellcome Trust grant 
            221327/Z/20/Z (N.B., V.P.W). J.W. acknowledges the receipt of studentship awards 
            from the Health Data Research UK-The Alan Turing Institute Wellcome PhD Programme 
            in Health Data Science (218529/Z/19/Z).
          </Text>

        </Stack>
      </Container>
    </>
  )
}

export default About

import {
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
  component: About,
})

function About() {

  return (
    <>
        <Container maxWidth={"100ch"}>
          <Stack spacing={3}>
          <Heading
            size="lg"
            textAlign={{ base: "center", md: "left" }}
            pt={12}
          >
            About
          </Heading>
          <Text>

          </Text>
        </Stack>
      </Container>
    </>
  )
}

export default About

import { Container, Heading, Stack, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import SwaggerUI from "swagger-ui-react"

import "swagger-ui-react/swagger-ui.css"

const API_BASE_URL = import.meta.env.VITE_API_URL

export const Route = createFileRoute("/_layout/api")({
  component: Api,
})

function Api() {
  return (
    <>
      <Container maxWidth={"100ch"}>
        <Stack spacing={3}>
          <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
            Programmatic access API endpoints
          </Heading>
          <Text>
          Welcome to the interactive documentation page for The Encyclopaedia of Domains 
          Application Programming Interface (API). The API provides a convenient way for 
          developers to programmatically access metadata related to TED annotations.
          </Text>
          <SwaggerUI url={`${API_BASE_URL}/api/v1/openapi.json`} />
        </Stack>
      </Container>
    </>
  )
}

export default Api

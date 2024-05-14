import {
  Box,
  Center,
  Container,
} from "@chakra-ui/react"
import type React from "react"
import Citation from "./Citation"


const Footer: React.FC = () => {

  return (
    <>
      <Box bgColor={"#eee"}>
        <Container maxW={"6xl"}>
          <Center>
            <Citation />
          </Center>
        </Container>
      </Box>
    </>
  )
}

export default Footer

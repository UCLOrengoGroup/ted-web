import {
  Box,
  Center,
  Container,
  Image,
} from "@chakra-ui/react"
import type React from "react"
import Citation from "./Citation"

import ImgUCL from "../../assets/images/ucl-logo-black-on-grey.jpg"


const Footer: React.FC = () => {

  return (
    <Box pt={12}>
      <Box bgColor={"#eee"}>
        <Container maxW={"6xl"}>
          <Center>
            <Citation />
            <Image src={ImgUCL} alt="UCL Logo" />
          </Center>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer

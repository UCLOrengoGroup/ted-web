import { Box, Center,  Container, Image, Stack } from "@chakra-ui/react"
import type React from "react"
import Citation from "./Citation"

import ImgUCL from "../../assets/images/ucl-logo-black-on-grey.jpg"

const Footer: React.FC = () => {
  return (
    <Box pt={12}>
      <Box bgColor={"#eee"}>
        <Container maxW={"6xl"}>
          <Stack direction={["column","row"]} spacing={2} align={"center"}>
            <Box>
              <Citation />
            </Box>
            <Box>
              <Image src={ImgUCL} alt="UCL Logo" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer

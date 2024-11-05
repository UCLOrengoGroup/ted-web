"use client"

import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  type IconProps,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import logoImg from "../../assets/images/ted_logo.png"
import Carousel from "../../components/Common/Carousel"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Box>
            <Image
              src={logoImg}
              alt="TED Logo"
              height={"100px"}
              objectFit={"contain"}
            />
          </Box>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
          >
            TED: The Encyclopedia of Domains
          </Heading>
          <Text color={"gray.700"}>
            The Encyclopedia of Domains combines state-of-the-art deep
            learning-based domain parsing and structure comparison algorithms to
            segment and classify domains across the whole{" "}
            <Link href="https://alphafold.ebi.ac.uk">AlphaFold Database</Link>.
            TED describes nearly 365 million domains, over 100 million more than
            detectable by sequence-based methods. Nearly 77% of TED domains
            share similarities to known superfamilies in{" "}
            <Link href="https://www.cathdb.info">CATH</Link>, greatly expanding
            the set of known protein structural domains.
          </Text>
          <Text color={"gray.700"}>
            TED is built and maintained by the Structural Bioinformatics groups
            of{" "}
            <Link href="http://www0.cs.ucl.ac.uk/staff/d.jones/">
              Prof. David Jones
            </Link>{" "}
            and{" "}
            <Link href="https://www.ucl.ac.uk/orengo-group/">
              Prof. Christine Orengo
            </Link>{" "}
            at University College London, UK.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"teal"}
              _hover={{ bg: "red.500" }}
            >
              <Link as={RouterLink} to={"/search"}>
                Search
              </Link>
            </Button>
            <Button
              rounded={"full"}
              px={6}
            >
              <Link as={RouterLink} to={"/about"}>
                About
              </Link>
            </Button>
            <Button
              rounded={"full"}
              px={6}
              >
              <Link href={"https://www.science.org/stoken/author-tokens/ST-2226/full"}>
                Full Access Science Article
                <ExternalLinkIcon mx='2px' />
              </Link>
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"500px"}
            overflow={"hidden"}
          >
            <Carousel />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  )
}

export default Dashboard

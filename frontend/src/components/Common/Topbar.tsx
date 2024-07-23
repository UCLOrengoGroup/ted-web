import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import type React from "react"

interface Props {
  children: React.ReactNode
  href: string
}

const TopbarItems = [
  { title: "Home", path: "/" },
  { title: "Search", path: "/search" },
  { title: "Data", path: "/data" },
  { title: "About", path: "/about" },
  { title: "API", path: "/access" },
]

const NavLink = (props: Props) => {
  const { children, href } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("purple.500", "purple.600"),
      }}
      href={href}
    >
      {children}
    </Box>
  )
}

const Topbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box color={useColorModeValue("white", "white")} bg={useColorModeValue("purple.700", "purple.800")} px={4}>
        <Container>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box fontWeight={900} fontSize={{ base: "2l" }}>
                TED
              </Box>
              <HStack
                as={"nav"}
                spacing={6}
                display={{ base: "none", md: "flex" }}
              >
                {TopbarItems.map((item) => (
                  <NavLink key={item.path} href={item.path}>
                    {item.title}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {TopbarItems.map((item) => (
                  <NavLink key={item.path} href={item.path}>
                    {item.title}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  )
}

export default Topbar

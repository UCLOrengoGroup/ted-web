import {
  Box,
  Flex,
  HStack,
  Container,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import React from "react"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
  children: React.ReactNode
  href: string
}

const TopbarItems = [
    { title: "Home", path: "/" },
    { title: "Search", path: "/search" },
    { title: "Data", path: "/data" },
    { title: "API", path: "/api" },
    { title: "About", path: "/about" },
  ]

const NavLink = (props: Props) => {
  const { children, href } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}>
      {children}
    </Box>
  )
}

const Topbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container>

        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box
                fontWeight={600}
                fontSize={{ base: '2l' }}>
            TED</Box>
            <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
              {TopbarItems.map((item) => (
                <NavLink key={item.path} href={item.path}>{item.title}</NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {TopbarItems.map((item) => (
                <NavLink key={item.path} href={item.path}>{item.title}</NavLink>
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
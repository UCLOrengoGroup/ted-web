import { Flex, Spinner, Stack } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"

import Footer from "../components/Common/Footer"
import Topbar from "../components/Common/Topbar"

export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  const isLoading = false

  return (
    <Stack>
      <Topbar />
      <Flex maxW="large" minH={"70vh"} h="auto" position="relative">
        {isLoading ? (
          <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (
          <Outlet />
        )}
      </Flex>
      <Footer />
    </Stack>
  )
}

export default Layout

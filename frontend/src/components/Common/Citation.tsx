"use client"

import { Stack, Text, Link } from "@chakra-ui/react"

export default function Citation() {
  return (
    <Stack p="8">
      <Text>
        Please use the following citation when referencing this work:
      </Text>
      <Text>
        <Link href="https://doi.org/10.1101/2024.03.18.585509">
          Exploring structural diversity across the protein universe with The
          Encyclopedia of Domains
        </Link>
      </Text>
      <Text fontSize={{ base: "sm" }}>
        Lau, A. M., Bordin, N., Kandathil, S. M., Sillitoe, I., Waman, V. P.,
        Wells, J., Orengo, C. and Jones, D. T.
      </Text>
      <Text fontSize={{ base: "sm" }}>
        <Link href="https://doi.org/10.1101/2024.03.18.585509">
          doi:10.1101/2024.03.18.585509
        </Link>
      </Text>
    </Stack>
  )
}

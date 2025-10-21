"use client"

import { Link, Stack, Text } from "@chakra-ui/react"

export default function Citation() {
  return (
    <Stack p="8">
      <Text>Please use the following citation when referencing this work:</Text>
      <Text>
        <Link href="https://doi.org/10.1126/science.adq4946">
          Exploring structural diversity across the protein universe with The
          Encyclopedia of Domains
        </Link>
      </Text>
      <Text fontSize={{ base: "sm" }}>
        Lau, A. M., Bordin, N., Kandathil, S. M., Sillitoe, I., Waman, V. P.,
        Wells, J., Orengo, C. and Jones, D. T.
      </Text>
      <Text fontSize={{ base: "sm" }}>
        <Text as="span" fontStyle="italic">
          Science
        </Text>{" "}
        <Text as="span" fontWeight="600">
          386
        </Text>
        , eadq4946 (2024).{" "}
        <Link href="https://doi.org/10.1126/science.adq4946">
          doi:10.1126/science.adq4946
        </Link>
      </Text>
    </Stack>
  )
}

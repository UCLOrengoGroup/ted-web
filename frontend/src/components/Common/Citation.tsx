'use client'

import { Stack, Text } from '@chakra-ui/react'

export default function Citation() {
  return (
    <Stack p="4">
        <Text fontSize={{ base: 'xl' }}>
            Please use the following citation when referencing this work:</Text>
        <Text>
            Exploring structural diversity across the protein universe with The Encyclopedia of Domains
        </Text>
        <Text fontSize={{ base: 'sm' }}>
            Lau, A. M., Bordin, N., Kandathil, S. M., Sillitoe, I., Waman, V. P., Wells, J., Orengo, C. and Jones, D. T.
        </Text>
    </Stack>
  )
}

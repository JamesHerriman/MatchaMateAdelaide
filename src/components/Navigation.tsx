'use client'

import { Box, Container, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

export default function Navigation() {
  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading size="lg" color="matcha.600" fontWeight="bold">
              MatchaMate Adelaide
            </Heading>
          </Link>
          <Flex gap={6}>
            <Link href="/cafes" style={{ textDecoration: 'none' }}>
              <Box
                as="span"
                fontSize="lg"
                color="gray.700"
                _hover={{ textDecoration: 'underline', color: 'matcha.600' }}
                transition="all 0.2s"
              >
                Cafés
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <Box
        minH="80vh"
        bgGradient="linear(to-br, matcha.100, pink.100)"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl" py={20}>
          <VStack spacing={8} align="start" maxW="2xl">
            <Heading
              as="h1"
              size="3xl"
              color="matcha.800"
              lineHeight="1.2"
              fontWeight="bold"
            >
              Your Guide to Adelaide's Best Matcha Cafes
            </Heading>
            <Text fontSize="xl" color="gray.700" maxW="lg">
              Discover real matcha spots loved by locals — from the CBD to the East End.
              No outdated blogs, no tourist traps. Just authentic Adelaide matcha culture.
            </Text>
            <Button
              as={Link}
              href="/cafes"
              size="lg"
              colorScheme="matcha"
              bg="matcha.500"
              _hover={{ bg: 'matcha.600' }}
              px={8}
              py={6}
              fontSize="lg"
            >
              Browse Cafes
            </Button>
          </VStack>
        </Container>

        {/* Decorative elements */}
        <Box
          position="absolute"
          top="10%"
          right="10%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="matcha.200"
          opacity="0.3"
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          bottom="10%"
          right="20%"
          w="250px"
          h="250px"
          borderRadius="full"
          bg="pink.200"
          opacity="0.3"
          filter="blur(60px)"
        />
      </Box>
    </>
  )
}

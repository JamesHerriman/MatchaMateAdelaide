'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
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
          <HStack spacing={12} align="center" justify="space-between">
            <VStack spacing={8} align="start" maxW="2xl" flex="1">
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
              <Link href="/cafes">
                <Button
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
              </Link>
            </VStack>

            <Box
              display={{ base: 'none', lg: 'block' }}
              flex="1"
              maxW="500px"
              height="500px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1536013452277-279e6f9f1e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Matcha latte with latte art"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </HStack>
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

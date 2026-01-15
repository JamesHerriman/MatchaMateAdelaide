'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Card,
  CardBody,
  Link as ChakraLink,
  HStack,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import StarRating from '@/components/StarRating'
import { MapErrorBoundary } from '@/components/MapErrorBoundary'
import { cafes, Café } from '@/data/cafes'
import { supabase } from '@/lib/supabase'

// Dynamically import map component to avoid SSR issues with Leaflet
const CafeMap = dynamic(() => import('@/components/CafeMap'), {
  ssr: false,
  loading: () => (
    <Box h="500px" bg="gray.100" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
      <Text>Loading map...</Text>
    </Box>
  ),
})

// Helper function to check if a cafe is currently open
function isCafeOpen(cafe: Café): boolean {
  if (!cafe.openingHours) return true // If no hours specified, assume open

  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const currentTime = now.getHours() * 60 + now.getMinutes() // minutes since midnight

  // Get the hours for current day
  const todayHours = cafe.openingHours[currentDay as keyof typeof cafe.openingHours]

  if (!todayHours || todayHours === 'Closed') return false

  // Parse opening hours (e.g., "7:00 AM - 3:00 PM")
  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
  const match = todayHours.match(timeRegex)

  if (!match) return true // If we can't parse, assume open

  const [_, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match

  // Convert to 24-hour format and calculate minutes since midnight
  let openTime = parseInt(openHour) * 60 + parseInt(openMin)
  if (openPeriod.toUpperCase() === 'PM' && parseInt(openHour) !== 12) openTime += 12 * 60
  if (openPeriod.toUpperCase() === 'AM' && parseInt(openHour) === 12) openTime = parseInt(openMin)

  let closeTime = parseInt(closeHour) * 60 + parseInt(closeMin)
  if (closePeriod.toUpperCase() === 'PM' && parseInt(closeHour) !== 12) closeTime += 12 * 60
  if (closePeriod.toUpperCase() === 'AM' && parseInt(closeHour) === 12) closeTime = parseInt(closeMin)

  return currentTime >= openTime && currentTime <= closeTime
}

export default function CafesPage() {
  const [cafeRatings, setCafeRatings] = useState<Record<string, { average: number; count: number }>>({})
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  useEffect(() => {
    const fetchAllRatings = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('cafe_id, rating')

        if (error) throw error

        // Calculate average rating and count for each cafe
        const ratings: Record<string, { average: number; count: number }> = {}
        cafes.forEach((cafe) => {
          const cafeReviews = data?.filter((r) => r.cafe_id === cafe.id) || []
          if (cafeReviews.length > 0) {
            const average = cafeReviews.reduce((sum, r) => sum + r.rating, 0) / cafeReviews.length
            ratings[cafe.id] = {
              average: Math.round(average * 10) / 10,
              count: cafeReviews.length
            }
          }
        })
        setCafeRatings(ratings)
      } catch (error) {
        console.error('Error fetching ratings:', error)
      }
    }

    fetchAllRatings()
  }, [])

  // Filter and sort cafes
  let filteredCafes = [...cafes]

  // Apply "Open Now" filter if enabled
  if (showOpenOnly) {
    filteredCafes = filteredCafes.filter(cafe => isCafeOpen(cafe))
  }

  // Sort cafes by rating (highest first), then alphabetically for unrated cafes
  const sortedCafes = filteredCafes.sort((a, b) => {
    const ratingA = cafeRatings[a.id]
    const ratingB = cafeRatings[b.id]

    // If both have ratings, sort by average rating (descending)
    if (ratingA && ratingB) {
      return ratingB.average - ratingA.average
    }

    // If only one has a rating, it comes first
    if (ratingA && !ratingB) return -1
    if (!ratingA && ratingB) return 1

    // If neither has a rating, sort alphabetically
    return a.name.localeCompare(b.name)
  })

  return (
    <>
      <Navigation />
      <Box bg="gray.50" minH="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading as="h1" size="2xl" color="matcha.700" mb={4}>
                Adelaide's Matcha Cafés
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Explore {cafes.length} authentic matcha spots across Adelaide CBD
              </Text>
            </Box>

            {/* Map Section */}
            <Box>
              <Heading as="h2" size="lg" color="matcha.600" mb={4}>
                Map View
              </Heading>
              <MapErrorBoundary>
                <CafeMap cafes={cafes} />
              </MapErrorBoundary>
            </Box>

            {/* Cafes List */}
            <Box>
              <HStack justify="space-between" align="center" mb={4}>
                <Heading as="h2" size="lg" color="matcha.600">
                  Top Cafés
                </Heading>
                <FormControl display="flex" alignItems="center" w="auto">
                  <FormLabel htmlFor="open-now" mb="0" fontSize="sm" color="gray.700">
                    Open Now
                  </FormLabel>
                  <Switch
                    id="open-now"
                    colorScheme="green"
                    isChecked={showOpenOnly}
                    onChange={(e) => setShowOpenOnly(e.target.checked)}
                  />
                </FormControl>
              </HStack>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Showing {sortedCafes.length} {sortedCafes.length === 1 ? 'café' : 'cafés'}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {sortedCafes.map((cafe) => {
                  const rating = cafeRatings[cafe.id]
                  return (
                    <Link key={cafe.id} href={`/cafes/${cafe.id}`} style={{ textDecoration: 'none' }}>
                      <Card
                        h="100%"
                        _hover={{
                          transform: 'translateY(-4px)',
                          shadow: 'xl',
                        }}
                        transition="all 0.3s"
                        cursor="pointer"
                      >
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <Heading size="md" color="matcha.700">
                              {cafe.name}
                            </Heading>
                            {rating && (
                              <HStack spacing={2}>
                                <StarRating rating={rating.average} />
                                <Text fontSize="sm" color="gray.600">
                                  {rating.average.toFixed(1)} ({rating.count})
                                </Text>
                              </HStack>
                            )}
                            <Text fontSize="sm" color="gray.600">
                              {cafe.address}
                            </Text>
                            {cafe.specialty && (
                              <Text fontSize="sm" color="matcha.500" fontWeight="medium">
                                {cafe.specialty}
                              </Text>
                            )}
                            {cafe.description && (
                              <Text fontSize="sm" color="gray.600">
                                {cafe.description}
                              </Text>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}

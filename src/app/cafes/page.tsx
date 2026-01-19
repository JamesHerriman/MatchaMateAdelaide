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
  Badge,
} from '@chakra-ui/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import StarRating from '@/components/StarRating'
import { MapErrorBoundary } from '@/components/MapErrorBoundary'
import { cafes } from '@/data/cafes'
import { supabase } from '@/lib/supabase'
import { isCafeOpen } from '@/utils/cafeHelpers'

// Dynamically import map component to avoid SSR issues with Leaflet
const CafeMap = dynamic(() => import('@/components/CafeMap'), {
  ssr: false,
  loading: () => (
    <Box h="500px" bg="gray.100" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
      <Text>Loading map...</Text>
    </Box>
  ),
})

export default function CafesPage() {
  const [cafeRatings, setCafeRatings] = useState<Record<string, { average: number; count: number }>>({})
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [locationFilter, setLocationFilter] = useState<'cbd' | 'outside' | 'all'>('all')

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

  // Apply location filter
  if (locationFilter !== 'all') {
    filteredCafes = filteredCafes.filter(cafe => cafe.location === locationFilter)
  }

  // Apply "Open Now" filter if enabled
  if (showOpenOnly) {
    filteredCafes = filteredCafes.filter(cafe => isCafeOpen(cafe))
  }

  // Calculate map center and zoom based on location filter
  const getMapSettings = () => {
    if (locationFilter === 'cbd') {
      return { center: [-34.9285, 138.6007] as [number, number], zoom: 15 }
    } else if (locationFilter === 'outside') {
      return { center: [-34.89, 138.56] as [number, number], zoom: 12 }
    } else {
      // Show all cafes - zoom out to see both CBD and outside
      return { center: [-34.91, 138.58] as [number, number], zoom: 12 }
    }
  }

  const mapSettings = getMapSettings()

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
                Explore {cafes.length} authentic matcha spots across Adelaide
              </Text>
            </Box>

            {/* Map Section */}
            <Box>
              <HStack justify="space-between" align="center" mb={4}>
                <Heading as="h2" size="lg" color="matcha.600">
                  Map View
                </Heading>
                <HStack spacing={4}>
                  <FormControl display="flex" alignItems="center" w="auto">
                    <FormLabel htmlFor="location-filter" mb="0" fontSize="sm" color="gray.700" mr={2}>
                      Location:
                    </FormLabel>
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        variant={locationFilter === 'all' ? 'solid' : 'outline'}
                        colorScheme="matcha"
                        onClick={() => setLocationFilter('all')}
                      >
                        All
                      </Button>
                      <Button
                        size="sm"
                        variant={locationFilter === 'cbd' ? 'solid' : 'outline'}
                        colorScheme="matcha"
                        onClick={() => setLocationFilter('cbd')}
                      >
                        CBD
                      </Button>
                      <Button
                        size="sm"
                        variant={locationFilter === 'outside' ? 'solid' : 'outline'}
                        colorScheme="matcha"
                        onClick={() => setLocationFilter('outside')}
                      >
                        Outside CBD
                      </Button>
                    </HStack>
                  </FormControl>
                </HStack>
              </HStack>
              <MapErrorBoundary>
                <CafeMap
                  cafes={filteredCafes}
                  isCafeOpen={isCafeOpen}
                  center={mapSettings.center}
                  zoom={mapSettings.zoom}
                />
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
                  const isOpen = isCafeOpen(cafe)
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
                        position="relative"
                      >
                        <Badge
                          position="absolute"
                          top={4}
                          right={4}
                          colorScheme={isOpen ? 'green' : 'red'}
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          {isOpen ? 'Open' : 'Closed'}
                        </Badge>
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

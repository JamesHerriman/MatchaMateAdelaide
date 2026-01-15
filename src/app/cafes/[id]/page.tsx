'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Badge,
  Card,
  CardBody,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import StarRating from '@/components/StarRating'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import { cafes } from '@/data/cafes'
import { Review } from '@/types/reviews'
import { supabase, SupabaseReview } from '@/lib/supabase'

const CafeMap = dynamic(() => import('@/components/CafeMap'), {
  ssr: false,
  loading: () => (
    <Box h="300px" bg="gray.100" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
      <Text>Loading map...</Text>
    </Box>
  ),
})

export default function CafeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cafeId = params?.id as string

  const cafe = cafes.find((c) => c.id === cafeId)

  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('cafe_id', cafeId)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedReviews: Review[] = (data as SupabaseReview[]).map((r) => ({
        id: r.id,
        cafeId: r.cafe_id,
        rating: r.rating,
        comment: r.comment,
        author: r.author,
        date: r.created_at,
      }))

      setReviews(formattedReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [cafeId])

  const handleReviewSubmit = () => {
    // Refresh reviews after submission
    fetchReviews()
  }

  if (!cafe) {
    return (
      <>
        <Navigation />
        <Container maxW="container.xl" py={10}>
          <Text>Cafe not found</Text>
          <Button onClick={() => router.push('/cafes')} mt={4}>
            Back to Cafes
          </Button>
        </Container>
      </>
    )
  }

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  return (
    <>
      <Navigation />
      <Box bg="gray.50" minH="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="ghost"
              onClick={() => router.push('/cafes')}
              alignSelf="flex-start"
              color="matcha.600"
            >
              Back to all cafes
            </Button>

            <Card>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading as="h1" size="2xl" color="matcha.700" mb={2}>
                      {cafe.name}
                    </Heading>
                    <HStack spacing={4} mt={4}>
                      <StarRating rating={averageRating} />
                      <Text color="gray.600">
                        {averageRating > 0
                          ? `${averageRating.toFixed(1)} out of 5`
                          : 'No ratings yet'}
                      </Text>
                      <Badge colorScheme="matcha">{reviews.length} reviews</Badge>
                    </HStack>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontSize="lg" color="gray.700" fontWeight="medium">
                      Address
                    </Text>
                    <Text color="gray.600">{cafe.address}</Text>
                  </Box>

                  {cafe.specialty && (
                    <Box>
                      <Text fontSize="lg" color="gray.700" fontWeight="medium">
                        Specialty
                      </Text>
                      <Text color="matcha.600" fontWeight="medium">
                        {cafe.specialty}
                      </Text>
                    </Box>
                  )}

                  {cafe.description && (
                    <Box>
                      <Text fontSize="lg" color="gray.700" fontWeight="medium">
                        About
                      </Text>
                      <Text color="gray.600">{cafe.description}</Text>
                    </Box>
                  )}

                  {cafe.openingHours && (
                    <Box>
                      <Text fontSize="lg" color="gray.700" fontWeight="medium" mb={3}>
                        Opening Hours
                      </Text>
                      <VStack align="stretch" spacing={2}>
                        {cafe.openingHours.monday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Monday</Text>
                            <Text color="gray.600">{cafe.openingHours.monday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.tuesday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Tuesday</Text>
                            <Text color="gray.600">{cafe.openingHours.tuesday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.wednesday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Wednesday</Text>
                            <Text color="gray.600">{cafe.openingHours.wednesday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.thursday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Thursday</Text>
                            <Text color="gray.600">{cafe.openingHours.thursday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.friday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Friday</Text>
                            <Text color="gray.600">{cafe.openingHours.friday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.saturday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Saturday</Text>
                            <Text color="gray.600">{cafe.openingHours.saturday}</Text>
                          </HStack>
                        )}
                        {cafe.openingHours.sunday && (
                          <HStack justify="space-between">
                            <Text color="gray.600" fontWeight="medium">Sunday</Text>
                            <Text color="gray.600">{cafe.openingHours.sunday}</Text>
                          </HStack>
                        )}
                      </VStack>
                    </Box>
                  )}

                  <Box>
                    <Text fontSize="lg" color="gray.700" fontWeight="medium" mb={4}>
                      Location
                    </Text>
                    <CafeMap cafes={[cafe]} />
                    <ChakraLink
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`}
                      isExternal
                      display="inline-flex"
                      alignItems="center"
                      mt={3}
                      color="matcha.600"
                      fontWeight="medium"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      View on Google Maps <ExternalLinkIcon mx="2px" />
                    </ChakraLink>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Box>
              <Heading as="h2" size="lg" color="matcha.700" mb={4}>
                Leave a Review
              </Heading>
              <Card>
                <CardBody>
                  <ReviewForm cafeId={cafeId} onReviewSubmit={handleReviewSubmit} />
                </CardBody>
              </Card>
            </Box>

            <Box>
              <Heading as="h2" size="lg" color="matcha.700" mb={4}>
                Reviews ({reviews.length})
              </Heading>
              <ReviewList reviews={reviews} />
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

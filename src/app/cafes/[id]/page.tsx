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

  // Store reviews in localStorage
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('reviews')
    if (storedReviews) {
      const allReviews = JSON.parse(storedReviews) as Review[]
      setReviews(allReviews.filter((r) => r.cafeId === cafeId))
    }
  }, [cafeId])

  const handleReviewSubmit = (reviewData: {
    rating: number
    comment: string
    author: string
  }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      cafeId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      author: reviewData.author,
      date: new Date().toISOString(),
    }

    // Load all reviews, add new one, and save back
    const storedReviews = localStorage.getItem('reviews')
    const allReviews = storedReviews ? JSON.parse(storedReviews) : []
    const updatedReviews = [...allReviews, newReview]
    localStorage.setItem('reviews', JSON.stringify(updatedReviews))

    // Update state
    setReviews((prev) => [newReview, ...prev])
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
                      <StarRating rating={Math.round(averageRating)} />
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

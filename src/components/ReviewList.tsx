'use client'

import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react'
import { Review } from '@/types/reviews'
import StarRating from './StarRating'

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No reviews yet. Be the first to review!</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" color="gray.800">
                    {review.author}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(review.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </VStack>
                <StarRating rating={review.rating} />
              </HStack>
              <Divider />
              <Text color="gray.700">{review.comment}</Text>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  )
}

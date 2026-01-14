'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react'
import StarRating from './StarRating'
import { supabase } from '@/lib/supabase'

interface ReviewFormProps {
  cafeId: string
  onReviewSubmit: () => void
}

export default function ReviewForm({ cafeId, onReviewSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [author, setAuthor] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a star rating',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: 'Comment required',
        description: 'Please write a comment',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!author.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter your name',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('reviews').insert({
        cafe_id: cafeId,
        rating,
        comment: comment.trim(),
        author: author.trim(),
      })

      if (error) throw error

      // Reset form
      setRating(0)
      setComment('')
      setAuthor('')

      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      // Trigger refresh
      onReviewSubmit()
    } catch (error) {
      console.error('Error submitting review:', error)
      toast({
        title: 'Error submitting review',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel color="gray.700">Your Rating</FormLabel>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            isInteractive
            size={32}
          />
          {rating > 0 && (
            <Text fontSize="sm" color="gray.600" mt={2}>
              You rated: {rating} out of 5 stars
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.700">Your Name</FormLabel>
          <Input
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            bg="white"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.700">Your Review</FormLabel>
          <Textarea
            placeholder="Share your experience with this cafe's matcha..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            bg="white"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="matcha"
          bg="matcha.500"
          _hover={{ bg: 'matcha.600' }}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          Submit Review
        </Button>
      </VStack>
    </Box>
  )
}

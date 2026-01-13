'use client'

import { HStack, Icon } from '@chakra-ui/react'
import { FaStar, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  onRatingChange?: (rating: number) => void
  isInteractive?: boolean
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  onRatingChange,
  isInteractive = false,
}: StarRatingProps) {
  const handleClick = (selectedRating: number) => {
    if (isInteractive && onRatingChange) {
      onRatingChange(selectedRating)
    }
  }

  return (
    <HStack spacing={1}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        return (
          <Icon
            key={index}
            as={starValue <= rating ? FaStar : FaRegStar}
            color={starValue <= rating ? 'yellow.400' : 'gray.300'}
            boxSize={`${size}px`}
            cursor={isInteractive ? 'pointer' : 'default'}
            onClick={() => handleClick(starValue)}
            _hover={
              isInteractive
                ? {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s',
                  }
                : {}
            }
          />
        )
      })}
    </HStack>
  )
}

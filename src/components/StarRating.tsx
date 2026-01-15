'use client'

import { HStack, Icon, Box } from '@chakra-ui/react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

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
        const difference = rating - index

        // Determine which star icon to show
        let starIcon = FaRegStar
        let starColor = 'gray.300'

        if (difference >= 1) {
          // Full star
          starIcon = FaStar
          starColor = 'yellow.400'
        } else if (difference > 0) {
          // Partial star - show filled portion
          // Use a container with gradient to show partial fill
          return (
            <Box
              key={index}
              position="relative"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              width={`${size}px`}
              height={`${size}px`}
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
            >
              {/* Empty star background */}
              <Icon
                as={FaRegStar}
                color="gray.300"
                boxSize={`${size}px`}
                position="absolute"
                top="0"
                left="0"
              />
              {/* Filled star with clip */}
              <Icon
                as={FaStar}
                color="yellow.400"
                boxSize={`${size}px`}
                position="absolute"
                top="0"
                left="0"
                style={{
                  clipPath: `inset(0 ${100 - difference * 100}% 0 0)`,
                }}
              />
            </Box>
          )
        }

        return (
          <Icon
            key={index}
            as={starIcon}
            color={starColor}
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

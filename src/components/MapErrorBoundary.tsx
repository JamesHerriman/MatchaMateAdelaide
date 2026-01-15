'use client'

import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class MapErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's the Leaflet initialization error
    if (error.message?.includes('Map container is already initialized')) {
      return { hasError: true }
    }
    // For other errors, let them propagate
    throw error
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only catch the specific Leaflet error
    if (!error.message?.includes('Map container is already initialized')) {
      throw error
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          h="500px"
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.600">
            Map temporarily unavailable. Refresh the page to view the map.
          </Text>
        </Box>
      )
    }

    return this.props.children
  }
}

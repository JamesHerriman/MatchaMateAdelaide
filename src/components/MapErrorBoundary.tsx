'use client'

import React from 'react'
import { Box, Text, Button, VStack } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  resetKey: number
}

export class MapErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, resetKey: 0 }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
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

  handleReset = () => {
    this.setState({ hasError: false, resetKey: this.state.resetKey + 1 })
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
          <VStack spacing={4}>
            <Text color="gray.600">
              Map temporarily unavailable due to a hot reload issue.
            </Text>
            <Button colorScheme="green" onClick={this.handleReset}>
              Reload Map
            </Button>
          </VStack>
        </Box>
      )
    }

    return <div key={this.state.resetKey}>{this.props.children}</div>
  }
}

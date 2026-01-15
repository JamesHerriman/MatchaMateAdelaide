'use client'

import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import L from 'leaflet'
import { Café } from '@/data/cafes'

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface CafeMapProps {
  cafes: Café[]
}

export default function CafeMap({ cafes }: CafeMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Fix for Leaflet default icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

    // Cleanup function to remove map instance on unmount
    return () => {
      if (containerRef.current) {
        const container = containerRef.current.querySelector('.leaflet-container') as any
        if (container && container._leaflet_id) {
          // Remove the Leaflet instance
          const map = (container as any)._leaflet_map
          if (map) {
            map.remove()
          }
        }
      }
    }
  }, [])

  // Center of Adelaide CBD
  const center: [number, number] = [-34.9285, 138.6007]

  if (!isMounted) {
    return <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" />
  }

  // If map initialization fails (hot reload issue), show fallback
  if (hasError) {
    return (
      <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
        <Text color="gray.600">Map temporarily unavailable. Refresh the page to view the map.</Text>
      </Box>
    )
  }

  try {
    return (
      <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" ref={containerRef}>
        <MapContainer
          center={center}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        {cafes.map((cafe) => (
          <Marker key={cafe.id} position={[cafe.lat, cafe.lng]} icon={icon}>
            <Popup>
              <Box p={2}>
                <Link href={`/cafes/${cafe.id}`} style={{ fontWeight: 'bold', color: 'var(--chakra-colors-matcha-600)', fontSize: '1.125rem', textDecoration: 'none' }}>
                  {cafe.name}
                </Link>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {cafe.address}
                </Text>
                {cafe.specialty && (
                  <Text fontSize="sm" color="matcha.500" mt={1}>
                    {cafe.specialty}
                  </Text>
                )}
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
    )
  } catch (error: any) {
    // Catch map initialization errors during hot reload
    if (error.message?.includes('Map container is already initialized')) {
      setHasError(true)
      return (
        <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
          <Text color="gray.600">Map temporarily unavailable. Refresh the page to view the map.</Text>
        </Box>
      )
    }
    throw error
  }
}

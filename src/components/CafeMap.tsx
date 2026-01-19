'use client'

import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Box, Text, Link as ChakraLink, Badge, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import L from 'leaflet'
import { Café } from '@/data/cafes'

// Create custom SVG icon with Chakra UI colors
const createCustomIcon = (isOpen: boolean) => {
  // Chakra UI green.500 = #38A169, red.500 = #E53E3E
  const color = isOpen ? '#38A169' : '#E53E3E'

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
      <path fill="${color}" stroke="#2C5282" stroke-width="1" d="M12.5 0C7.25 0 3 4.25 3 9.5c0 8.5 9.5 21.5 9.5 21.5S22 18 22 9.5C22 4.25 17.75 0 12.5 0z"/>
      <circle cx="12.5" cy="9.5" r="3" fill="#FFFFFF"/>
    </svg>
  `

  const iconUrl = 'data:image/svg+xml;base64,' + btoa(svgIcon)

  return L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12.5, 31],
    popupAnchor: [0, -31]
  })
}

interface CafeMapProps {
  cafes: Café[]
  isCafeOpen?: (cafe: Café) => boolean
  center?: [number, number]
  zoom?: number
}

// Component to update map view when center/zoom changes
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom, { animate: true })
  }, [center, zoom, map])

  return null
}

export default function CafeMap({ cafes, isCafeOpen, center: propCenter, zoom: propZoom }: CafeMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up any existing Leaflet containers before mounting
    if (containerRef.current) {
      const existingContainer = containerRef.current.querySelector('.leaflet-container') as any
      if (existingContainer) {
        // Remove the entire container to force fresh initialization
        existingContainer.parentNode?.removeChild(existingContainer)
      }
    }

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
        if (container) {
          // Try to remove the map instance
          if (container._leaflet_id) {
            const map = (L as any)._getMap?.(container._leaflet_id)
            if (map && map.remove) {
              map.remove()
            }
          }
          // Also clear the container's Leaflet ID
          delete container._leaflet_id
        }
      }
    }
  }, [])

  // Use prop center/zoom or default to Adelaide CBD
  const center: [number, number] = propCenter || [-34.9285, 138.6007]
  const zoom = propZoom || 15

  if (!isMounted) {
    return <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" />
  }

  return (
    <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" ref={containerRef}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        {cafes.map((cafe) => {
          const isOpen = isCafeOpen ? isCafeOpen(cafe) : true
          const icon = createCustomIcon(isOpen)

          return (
            <Marker key={cafe.id} position={[cafe.lat, cafe.lng]} icon={icon}>
              <Popup>
                <Box p={2}>
                  <HStack justify="space-between" align="start" mb={2}>
                    <Link href={`/cafes/${cafe.id}`} style={{ fontWeight: 'bold', color: 'var(--chakra-colors-matcha-700)', fontSize: '1.125rem', textDecoration: 'none' }}>
                      {cafe.name}
                    </Link>
                    <Badge
                      colorScheme={isOpen ? 'green' : 'red'}
                      fontSize="xs"
                      px={2}
                      py={1}
                      flexShrink={0}
                    >
                      {isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </HStack>
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
          )
        })}
      </MapContainer>
    </Box>
  );
}

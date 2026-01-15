'use client'

import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import L from 'leaflet'
import { Café } from '@/data/cafes'

// Create custom SVG icon with Chakra UI colors
const createCustomIcon = (isOpen: boolean) => {
  // Chakra UI green.500 = #38A169, red.500 = #E53E3E
  const color = isOpen ? '#38A169' : '#E53E3E'

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="25" height="41">
      <path fill="${color}" stroke="#FFFFFF" stroke-width="1.5" d="M12 0C7.029 0 3 4.029 3 9c0 7.5 9 18 9 18s9-10.5 9-18c0-4.971-4.029-9-9-9z"/>
      <circle cx="12" cy="9" r="3.5" fill="#FFFFFF"/>
    </svg>
  `

  const iconUrl = 'data:image/svg+xml;base64,' + btoa(svgIcon)

  return L.icon({
    iconUrl,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

interface CafeMapProps {
  cafes: Café[]
  isCafeOpen?: (cafe: Café) => boolean
}

export default function CafeMap({ cafes, isCafeOpen }: CafeMapProps) {
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

  // Center of Adelaide CBD
  const center: [number, number] = [-34.9285, 138.6007]

  if (!isMounted) {
    return <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" />
  }

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
        {cafes.map((cafe) => {
          const isOpen = isCafeOpen ? isCafeOpen(cafe) : true
          const icon = createCustomIcon(isOpen)

          return (
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
          )
        })}
      </MapContainer>
    </Box>
  );
}

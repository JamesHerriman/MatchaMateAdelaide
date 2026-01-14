'use client'

import { useEffect } from 'react'
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
  useEffect(() => {
    // Fix for Leaflet default icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  // Center of Adelaide CBD
  const center: [number, number] = [-34.9285, 138.6007]

  return (
    <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg">
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
                <Link href={`/cafes/${cafe.id}`} passHref legacyBehavior>
                  <ChakraLink fontWeight="bold" color="matcha.600" fontSize="lg">
                    {cafe.name}
                  </ChakraLink>
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
}

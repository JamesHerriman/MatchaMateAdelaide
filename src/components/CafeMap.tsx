'use client'

import { useEffect, useState } from 'react'
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
  const [mapKey, setMapKey] = useState<string>('')

  useEffect(() => {
    // Generate a unique key on mount to prevent re-initialization
    setMapKey(`map-${Date.now()}`)

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

  if (!mapKey) {
    return <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg" />
  }

  return (
    <Box h="500px" w="100%" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        key={mapKey}
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
  );
}

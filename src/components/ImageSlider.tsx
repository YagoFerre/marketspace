/* eslint-disable camelcase */
import { useRef, useState } from 'react'
import { Dimensions, FlatList, ViewToken } from 'react-native'
import { Box, HStack, Image, VStack, Text } from 'native-base'

import { api } from '@services/api'

interface ItemsChangedProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

interface Props {
  is_active?: boolean
  productImages: {
    id: string
    path: string
  }[]
}

export function ImageSlider({ productImages, is_active }: Props) {
  const [imageIndex, setImageIndex] = useState(0)
  const indexChanged = useRef((info: ItemsChangedProps) => {
    setImageIndex(info.viewableItems[0].index!)
  })

  const width = Dimensions.get('window').width

  return (
    <VStack>
      <FlatList
        data={productImages}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <Image
            alt="Imagem do produto"
            source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
            w={width}
            h={width / 1}
            resizeMode="contain"
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onViewableItemsChanged={indexChanged.current}
      />

      <HStack bottom={2} space={2} justifyContent="center">
        {productImages?.map((_, index) => (
          <Box
            key={index}
            bg={imageIndex === index ? 'gray.700:alpha.75' : 'gray.700:alpha.50'}
            rounded="full"
            w={width / 1.07 / productImages.length}
            h={1}
          />
        ))}
      </HStack>

      {!is_active && (
        <Box w={width} h={width / 1} bg="gray.100:alpha.60" position="absolute">
          <Text textTransform="uppercase" color="gray.700" fontFamily="bold" m="auto" fontSize="sm">
            anúncio desativado
          </Text>
        </Box>
      )}
    </VStack>
  )
}

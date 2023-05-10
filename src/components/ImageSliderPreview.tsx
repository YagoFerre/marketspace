/* eslint-disable camelcase */
import { useRef, useState } from 'react'
import { Dimensions, FlatList, ViewToken } from 'react-native'
import { Box, HStack, Image, VStack } from 'native-base'

interface ItemsChangedProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

interface Props {
  productImages: any[]
}

export function ImageSliderPreview({ productImages }: Props) {
  const [imageIndex, setImageIndex] = useState(0)
  const indexChanged = useRef((info: ItemsChangedProps) => {
    setImageIndex(info.viewableItems[0].index!)
  })

  const width = Dimensions.get('window').width

  return (
    <VStack>
      <FlatList
        data={productImages}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Image
            alt="Imagem do produto"
            source={{ uri: item.uri }}
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

      <HStack px={1} position="absolute" bottom={1} ml={1}>
        {productImages?.map((_, index) => (
          <Box
            mr={4}
            key={index}
            bg={imageIndex === index ? 'gray.700:alpha.75' : 'gray.700:alpha.50'}
            rounded="full"
            w={29}
            h={1}
          />
        ))}
      </HStack>
    </VStack>
  )
}

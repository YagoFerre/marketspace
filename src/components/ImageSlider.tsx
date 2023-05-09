import { useRef, useState } from 'react'
import { Dimensions, FlatList, ViewToken } from 'react-native'
import { Box, HStack, Image, VStack, Text } from 'native-base'

interface ItemsChangedProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

interface Props {
  active?: boolean
  productImages: any[]
}

export function ImageSlider({ productImages, active = true }: Props) {
  const [imageIndex, setImageIndex] = useState(0)
  const indexChanged = useRef((info: ItemsChangedProps) => {
    setImageIndex(info.viewableItems[0].index!)
  })

  const width = Dimensions.get('window').width

  return (
    <VStack>
      <FlatList
        contentContainerStyle={{}}
        data={productImages}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Image alt="Imagem do produto" source={item} w={width} h={width / 1} resizeMode="contain" />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onViewableItemsChanged={indexChanged.current}
      />

      <HStack px={1} position="absolute" bottom={1} ml={1}>
        {productImages.map((_, index) => (
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

      {!active && (
        <Box w={width} h={72} bg="gray.100:alpha.60" position="absolute">
          <Text textTransform="uppercase" color="gray.700" fontFamily="bold" m="auto" fontSize="sm">
            anúncio desativado
          </Text>
        </Box>
      )}
    </VStack>
  )
}

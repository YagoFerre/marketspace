import { Image, IImageProps, IconButton, HStack } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

interface Props extends IImageProps {
  onRemove: () => void
}

export function ImageProduct({ onRemove, ...rest }: Props) {
  return (
    <HStack>
      <Image size={27} rounded="md" alt="Imagem do produto" {...rest} />
      <IconButton
        onPress={onRemove}
        position="absolute"
        rounded="full"
        right={1}
        top={1}
        size={4}
        _icon={{
          as: MaterialIcons,
          name: 'close',
          color: 'gray.700',
          size: 3,
        }}
        bg="gray.100"
      />
    </HStack>
  )
}

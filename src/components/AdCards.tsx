import { Box, HStack, Heading, IPressableProps, Image, Pressable, Text } from 'native-base'

import { UserPhoto } from './UserPhoto'

import userPhotoDefault from '@assets/userPhotoDefault.png'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'

import { api } from '@services/api'

interface Props extends IPressableProps {
  data: ProductDetailsDTO
}

export function AdCards({ data, ...rest }: Props) {
  const priceFormatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(data.price / 100)

  return (
    <Pressable alignItems="flex-start" pb={6} {...rest}>
      <HStack>
        <Image
          alt="Imagem do meu produto"
          source={{ uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}` }}
          rounded="md"
          w={33}
          h={27}
        />
        <UserPhoto
          size={6}
          source={
            data.user.avatar
              ? { uri: `${api.defaults.baseURL}/images/${data.user.avatar}` }
              : userPhotoDefault
          }
          borderColor="gray.700"
          borderWidth={1}
          position="absolute"
          left={1}
          top={1}
        />
        <Box
          px={2}
          bg={data.is_new ? 'blue.normal' : 'gray.200'}
          rounded="full"
          position="absolute"
          right={1}
          top={1}
        >
          <Text color="white" fontFamily="bold" fontSize="xxs" textTransform="uppercase" textAlign="center">
            {data.is_new ? 'novo' : 'usado'}
          </Text>
        </Box>
      </HStack>

      <Text color="gray.200" fontFamily="regular" fontSize="md" mt={1}>
        {data.name}
      </Text>
      <Heading color="gray.100" fontFamily="bold" fontSize="lg">
        <Text color="gray.100" fontFamily="bold" fontSize="md">
          R$
        </Text>{' '}
        {priceFormatted}
      </Heading>
    </Pressable>
  )
}

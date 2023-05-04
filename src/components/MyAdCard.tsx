import { Box, HStack, Heading, IPressableProps, Image, Pressable, Text } from 'native-base'

import { UserPhoto } from './UserPhoto'

import productImage from '@assets/productImage.png'
import userPhotoDefault from '@assets/userPhotoDefault.png'

interface Props extends IPressableProps {
  active?: boolean
  isNew: boolean
}

export function MyAdCard({ active, isNew, ...rest }: Props) {
  return (
    <Pressable alignItems="flex-start" pb={6} {...rest}>
      <HStack>
        <Image
          alt="Imagem do meu produto"
          source={productImage}
          rounded="md"
          w={33}
          h={27}
          resizeMode="contain"
        />
        <UserPhoto
          size={6}
          source={userPhotoDefault}
          borderColor="gray.700"
          borderWidth={1}
          position="absolute"
          left={1}
          top={1}
        />
        <Box
          px={2}
          bg={isNew ? 'blue.normal' : 'gray.200'}
          rounded="full"
          position="absolute"
          right={1}
          top={1}
        >
          <Text color="white" fontFamily="bold" fontSize="xxs" textTransform="uppercase" textAlign="center">
            {isNew ? 'novo' : 'usado'}
          </Text>
        </Box>

        {!active && (
          <Box rounded="md" w={33} h={27} position="absolute" bg="gray.100:alpha.40">
            <Text
              position="absolute"
              bottom={1}
              left={2}
              textTransform="uppercase"
              fontFamily="bold"
              fontSize="xs"
              color="gray.700"
            >
              anúncio desativado
            </Text>
          </Box>
        )}
      </HStack>

      <Text color={active ? 'gray.200' : 'gray.400'} fontFamily="regular" fontSize="md" mt={1}>
        Sofá 1,80m
      </Text>
      <Heading color={active ? 'gray.100' : 'gray.400'} fontFamily="bold" fontSize="lg">
        <Text color={active ? 'gray.100' : 'gray.400'} fontFamily="bold" fontSize="md">
          R$
        </Text>{' '}
        1.200,00
      </Heading>
    </Pressable>
  )
}

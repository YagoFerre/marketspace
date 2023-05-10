/* eslint-disable no-unneeded-ternary */
/* eslint-disable camelcase */
import { Box, Center, HStack, Heading, ScrollView, Text, VStack } from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'
import { useAuth } from '@hooks/useAuth'
import { ImageSliderPreview } from '@components/ImageSliderPreview'

interface RouteParamsProps {
  product: ProductDTO
  images: any[]
}

export function PreviewAd() {
  const { user } = useAuth()

  const route = useRoute()
  const { product, images } = route.params as RouteParamsProps

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const productPreview = {
    ...product,
    price: Number(product.price) * 100,
    is_new: product.is_new === 'true' ? true : false,
  }

  const priceFormatted = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
    productPreview.price / 100,
  )

  async function handlePublishProduct() {
    try {
      const { data } = await api.post('/products', {
        name: productPreview.name,
        description: productPreview.description,
        is_new: productPreview.is_new,
        accept_trade: productPreview.accept_trade,
        payment_methods: productPreview.payment_methods,
        price: productPreview.price,
      })

      const dataForm = new FormData()
      dataForm.append('product_id', data.id)
      dataForm.append('images', images[0])
      dataForm.append('images', images[1])
      dataForm.append('images', images[2])

      await api.post('/products/images', dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(dataForm)
      navigation.navigate('MyAdDetails', { product_id: data.id })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  function handleBack() {
    navigation.navigate('CreateAd')
  }

  return (
    <VStack flex={1} bg="gray.600">
      <ScrollView>
        <Center pt={16} pb={4} bg="blue.light">
          <Heading color="gray.700" fontFamily="bold" fontSize="md">
            Pré visualização do anúncio
          </Heading>
          <Text color="gray.700" fontFamily="regular" fontSize="sm">
            É assim que seu produto vai aparecer!
          </Text>
        </Center>
        <ImageSliderPreview productImages={images} />

        <HStack px={6} pt={5}>
          <UserPhoto
            source={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : DefaultUserPhoto}
            size={6}
          />
          <Text color="gray.100" fontFamily="regular" fontSize="md" ml={2}>
            {user.name}
          </Text>
        </HStack>

        <Box mx={5} px={2} mt={6} bg="gray.500" rounded="full" maxW={15}>
          <Text
            color="gray.200"
            fontFamily="bold"
            fontSize="2xs"
            textAlign="center"
            textTransform="uppercase"
          >
            {productPreview.is_new === true ? 'novo' : 'usado'}
          </Text>
        </Box>

        <VStack px={6} mt={2}>
          <HStack justifyContent="space-between">
            <Heading fontFamily="bold" fontSize="xl">
              {productPreview.name}
            </Heading>
            <Heading color="blue.light" fontFamily="bold" fontSize="xl">
              <Text color="blue.light" fontFamily="bold" fontSize="md">
                R$
              </Text>{' '}
              {priceFormatted}
            </Heading>
          </HStack>
          <Text mt={2} fontFamily="regular" fontSize="md" color="gray.200">
            {productPreview.description}
          </Text>
        </VStack>

        <HStack px={6} mt={5}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200">
            Aceita troca?
          </Heading>
          <Text fontFamily="regular" fontSize="sm" color="gray.200" ml={2}>
            {productPreview.accept_trade === true ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <VStack px={6} mt={4}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200" mt={4}>
            Meios de pagamento:
          </Heading>

          {productPreview.payment_methods.map((method, index) => (
            <PaymentMethod key={method} methods={method} />
          ))}
        </VStack>

        <HStack py={5} px={6} mt={5} bg="gray.700" justifyContent="space-between" alignItems="center">
          <Button iconName="arrow-back" title="Voltar e editar" w={40} onPress={handleBack} />
          <Button
            variant="secondary"
            iconName="local-offer"
            bg="blue.light"
            title="Publicar"
            w={40}
            onPress={handlePublishProduct}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}

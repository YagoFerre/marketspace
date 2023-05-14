/* eslint-disable camelcase */
import { useCallback, useState } from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, Icon, ScrollView, Text, VStack, useToast } from 'native-base'

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { ImageSlider } from '@components/ImageSlider'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

interface RouteParamsProps {
  product_id: string
}

export function AdDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO)

  const toast = useToast()
  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { product_id } = route.params as RouteParamsProps

  async function fetchMyAdDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/products/${product_id}`)
      const product = {
        ...data,
        price: new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(data.price / 100),
        tel: Number(data.user.tel),
      }

      setProduct(product)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi carregar o produto. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const url = `https://wa.me/${product?.user?.tel}`
  const handleOpenUserContact = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      toast.show({
        title: 'Não foi possível abrir o link.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }, [url])

  function handleBack() {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAdDetails()
    }, [product_id]),
  )

  return (
    <VStack flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bg="gray.600">
          <TouchableOpacity
            style={{
              marginTop: 36,
              marginLeft: 24,
              marginBottom: 12,
            }}
            onPress={handleBack}
          >
            <Icon as={MaterialIcons} name="arrow-back" size={6} color="gray.100" />
          </TouchableOpacity>

          <ImageSlider productImages={product.product_images} is_active={product.is_active} />
          <HStack p={5}>
            <UserPhoto
              source={
                product?.user?.avatar
                  ? { uri: `${api.defaults.baseURL}/images/${product?.user?.avatar}` }
                  : DefaultUserPhoto
              }
              size={6}
            />
            <Text color="gray.100" fontFamily="regular" fontSize="md" ml={2}>
              {product?.user?.name}
            </Text>
          </HStack>

          <Box mx={5} px={2} py={1} bg="gray.500" rounded="full" maxW={15}>
            <Text
              color="gray.200"
              fontFamily="bold"
              fontSize="2xs"
              textAlign="center"
              textTransform="uppercase"
            >
              {product.is_new === true ? 'novo' : 'usado'}
            </Text>
          </Box>

          <VStack px={5} mt={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <Heading fontFamily="bold">{product.name}</Heading>
              <Heading color="blue.light" fontFamily="bold" fontSize="xl">
                <Text color="blue.light" fontFamily="bold" fontSize="md">
                  R$
                </Text>{' '}
                {product.price}
              </Heading>
            </HStack>
            <Text mt={2} fontFamily="regular" fontSize="md" color="gray.200">
              {product.description}
            </Text>

            <HStack mt={5}>
              <Heading fontFamily="bold" fontSize="md" color="gray.200">
                Aceita troca?
              </Heading>
              <Text fontFamily="regular" fontSize="sm" color="gray.200" ml={2}>
                {product.accept_trade === true ? 'Sim' : 'Não'}
              </Text>
            </HStack>

            <Heading fontFamily="bold" fontSize="md" color="gray.200" mt={4} mb={2}>
              Meios de pagamento:
            </Heading>

            {product.payment_methods?.map((method, index) => (
              <PaymentMethod key={index} methods={method.key} />
            ))}
          </VStack>

          <HStack py={5} px={6} mt={5} bg="gray.700" justifyContent="space-between" alignItems="center">
            <Heading color="blue.normal" fontFamily="bold" fontSize="2xl">
              <Text color="blue.normal" fontFamily="bold" fontSize="lg">
                R$
              </Text>{' '}
              {product.price}
            </Heading>
            <Button
              variant="secondary"
              iconName="contact-support"
              bg="blue.light"
              title="Entrar em contato"
              w="1/2"
              onPress={handleOpenUserContact}
            />
          </HStack>
        </ScrollView>
      )}
    </VStack>
  )
}

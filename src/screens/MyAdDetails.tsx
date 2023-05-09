/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, ScrollView, Icon, Text, VStack } from 'native-base'

import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { ImageSlider } from '@components/ImageSlider'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'

import { api } from '@services/api'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'
import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

interface RouteParamsProps {
  product_id: string
}

export function MyAdDetails() {
  const [loading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO)

  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  const { product_id } = route.params as RouteParamsProps

  async function fetchMyAdDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/products/${product_id}`)
      const product = {
        ...data,
        price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.price),
      }
      setProduct(product)
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleEditAd() {
    navigation.navigate('EditAd')
  }

  function handleBack() {
    navigation.navigate('MyAd')
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchMyAdDetails()
  //   }, [product_id]),
  // )

  useEffect(() => {
    fetchMyAdDetails()
  }, [product_id])

  return (
    <VStack flex={1} bg="gray.600">
      <ScrollView>
        <HStack px={6} justifyContent="space-between" pt={12} pb={4}>
          <TouchableOpacity onPress={handleBack}>
            <Icon as={MaterialIcons} name="arrow-back" color="gray.100" size={6} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEditAd}>
            <Icon as={MaterialIcons} name="border-color" color="gray.100" size={6} />
          </TouchableOpacity>
        </HStack>

        <ImageSlider productImages={product.product_images} />

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
            {product.is_new === true ? 'novo' : 'usado'}
          </Text>
        </Box>

        <VStack px={6} mt={2}>
          <HStack justifyContent="space-between">
            <Heading fontFamily="bold" fontSize="xl">
              {product.name}
            </Heading>
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
        </VStack>

        <HStack px={6} mt={5}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200">
            Aceita troca?
          </Heading>
          <Text fontFamily="regular" fontSize="sm" color="gray.200" ml={2}>
            {product.accept_trade === true ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <VStack px={6} mt={4}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200" mt={4}>
            Meios de pagamento:
          </Heading>

          {product.payment_methods.map((method, index) => (
            <PaymentMethod key={method} methods={method} />
          ))}
        </VStack>

        <VStack py={5} px={6} mt={5} justifyContent="space-between" alignItems="center">
          <Button variant="tertiary" iconName="power-settings-new" bg="gray.100" title="Desativar anúncio" />
          <Button iconName="delete-outline" title="Excluir anúncio" mt={2} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}

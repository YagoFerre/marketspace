/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, ScrollView, Icon, Text, VStack, useToast } from 'native-base'

import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { ImageSlider } from '@components/ImageSlider'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'
import { UserDTO } from '@dtos/UserDTO'
import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'

interface RouteParamsProps {
  product_id: string
}

export function MyAdDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
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

  async function fetchUserData() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/users/me')

      setUser(data)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os dados do usuário. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleChangeIsActiveAd() {
    try {
      setIsLoading(true)
      const { data } = await api.patch(`/products/${product_id}`, {
        is_active: !product.is_active,
      })

      setProduct({ ...product, is_active: data })
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível realizar as alterações. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleEditAd() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/products/${product_id}`)

      navigation.navigate('EditAd', { product_id: data.id })
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi carregar os dados. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteProduct() {
    try {
      await api.delete(`/products/${product_id}`)

      toast.show({
        title: 'O anúncio foi excluído com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigation.navigate('MyAd')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi excluir o anúncio. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  function handleBack() {
    navigation.navigate('MyAd')
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAdDetails()
    }, [product_id, product.is_active]),
  )

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <VStack flex={1} bg="gray.600">
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <HStack px={6} justifyContent="space-between" pt={12} pb={4}>
            <TouchableOpacity onPress={handleBack}>
              <Icon as={MaterialIcons} name="arrow-back" color="gray.100" size={6} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEditAd}>
              <Icon as={MaterialIcons} name="border-color" color="gray.100" size={6} />
            </TouchableOpacity>
          </HStack>

          <ImageSlider productImages={product.product_images} is_active={product.is_active} />

          <HStack px={6} pt={5}>
            <UserPhoto
              source={
                user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : DefaultUserPhoto
              }
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

            {product.payment_methods?.map((method, index) => (
              <PaymentMethod key={index} methods={method.key} />
            ))}
          </VStack>

          <VStack py={5} px={6} mt={5} justifyContent="space-between" alignItems="center">
            <Button
              variant="tertiary"
              iconName="power-settings-new"
              bg={product.is_active ? 'gray.100' : 'blue.light'}
              title={product.is_active ? 'Desativar anúncio' : 'Reativar anúncio'}
              onPress={handleChangeIsActiveAd}
            />
            <Button iconName="delete-outline" title="Excluir anúncio" mt={2} onPress={handleDeleteProduct} />
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}

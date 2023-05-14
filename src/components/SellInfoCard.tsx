import { useEffect, useState } from 'react'
import { HStack, Heading, IPressableProps, Icon, Pressable, Text, VStack, useToast } from 'native-base'

import { MaterialIcons, Feather } from '@expo/vector-icons'

import { AppError } from '@utils/AppError'
import { api } from '@services/api'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'

interface Props extends IPressableProps {}

export function SellInfoCard({ ...rest }: Props) {
  const [productsActive, setProductsActive] = useState<ProductDetailsDTO[]>([])

  const toast = useToast()

  async function fetchMyAd() {
    try {
      const { data } = await api.get('/users/products')
      const products = data.filter((product: ProductDetailsDTO) => product.is_active === true)

      setProductsActive(products)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi carregar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    fetchMyAd()
  }, [productsActive])

  return (
    <Pressable
      bg={'blue.light:alpha.10'}
      p={4}
      alignItems="center"
      rounded="lg"
      flexDirection="row"
      _pressed={{
        bg: 'blue.normal:alpha.20',
      }}
      {...rest}
    >
      <Icon as={MaterialIcons} name="local-offer" color="blue.normal" opacity={100} size={6} />
      <VStack ml={4} flex={1}>
        <Heading color="gray.200" fontFamily="bold">
          {productsActive.length}
        </Heading>
        <Text color="gray.200" fontFamily="regular">
          anúncios ativos
        </Text>
      </VStack>

      <HStack alignItems="center" justifyContent="center">
        <Text color="blue.normal" fontFamily="bold" fontSize="md">
          Meus anúncios
        </Text>
        <Icon as={Feather} name="arrow-right" color="blue.normal" size={5} ml={1} />
      </HStack>
    </Pressable>
  )
}

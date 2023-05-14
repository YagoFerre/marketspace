/* eslint-disable camelcase */
import { useCallback, useState } from 'react'
import { Divider, FlatList, IconButton, Text, VStack } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import { HomeHeader } from '@components/HomeHeader'
import { SellInfoCard } from '@components/SellInfoCard'
import { Modal } from '@components/Modal'
import { Input } from '@components/Input'
import { AdCards } from '@components/AdCards'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'
import { api } from '@services/api'

export function Home() {
  const [products, setProducts] = useState<ProductDetailsDTO[]>([])
  const [acceptTrade, setAcceptTrade] = useState<boolean | undefined>(undefined)
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined)
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [query, setQuery] = useState<string>('')

  const [modalIsVisible, setModalIsVisible] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchProducts() {
    try {
      const { data } = await api.get('/products', {
        params: {
          is_new: isNew,
          accept_trade: acceptTrade,
          payment_methods: paymentMethods,
          query,
        },
      })

      setProducts(data)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  function handleMyAd() {
    navigation.navigate('MyAd')
  }

  function handleAdDetails(product_id: string) {
    navigation.navigate('AdDetails', { product_id })
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
    }, [acceptTrade, isNew, paymentMethods, query]),
  )

  return (
    <VStack flex={1} bg="gray.600" py={8} px={6}>
      <HomeHeader />

      <Text color="gray.300" fontFamily="regular" mt={8} mb={3}>
        Seus produtos anunciados para venda
      </Text>

      <SellInfoCard onPress={handleMyAd} />

      <Text color="gray.300" fontFamily="regular" mt={8} mb={3}>
        Compre produtos variados
      </Text>

      <Input
        rounded="md"
        placeholder="Buscar anúncio"
        value={query}
        onChangeText={setQuery}
        InputRightElement={
          <>
            <IconButton
              size={10}
              _pressed={{
                bg: 'gray.600',
              }}
              _icon={{
                as: MaterialIcons,
                name: 'search',
                color: 'gray.200',
                size: 5,
              }}
            />
            <Divider orientation="vertical" thickness="1" h={5} />
            <IconButton
              size={10}
              onPress={() => setModalIsVisible(!modalIsVisible)}
              _pressed={{
                bg: 'gray.600',
              }}
              _icon={{
                as: MaterialIcons,
                name: 'filter-alt',
                color: 'gray.200',
                size: 5,
              }}
            />
          </>
        }
      />
      <Modal
        isOpen={modalIsVisible}
        onClose={() => setModalIsVisible(!modalIsVisible)}
        isNew={isNew}
        acceptTrade={acceptTrade}
        paymentMethods={paymentMethods}
        onAcceptTradeChange={setAcceptTrade}
        onIsNewChange={setIsNew}
        onPaymentMethodsChange={setPaymentMethods}
      />

      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AdCards data={item} onPress={() => handleAdDetails(item.id)} />}
        ListEmptyComponent={
          <Text color="gray.200" fontFamily="bold" fontSize="sm" textAlign="center" mt="1/2">
            Nenhum anúncio disponível.
          </Text>
        }
      />
    </VStack>
  )
}

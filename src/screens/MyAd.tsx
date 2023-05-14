/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, HStack, Heading, Icon, Select, Text, VStack, useToast } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import { MyAdCard } from '@components/MyAdCard'
import { Loading } from '@components/Loading'

import { api } from '@services/api'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'
import { AppError } from '@utils/AppError'

export function MyAd() {
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('todos')
  const [myProductsList, setMyProductsList] = useState<ProductDetailsDTO[]>([])
  const [myProductByFilter, setMyProductByFilter] = useState<ProductDetailsDTO[]>([])

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchMyAd() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/users/products')

      setMyProductsList(data)
      setMyProductByFilter(data)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi carregar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleLoadProductsByFilter() {
    if (filter === 'ativos') {
      const productsActive = myProductsList.filter((product) => product.is_active === true)
      setMyProductByFilter(productsActive)
    } else if (filter === 'inativos') {
      const productsInactive = myProductsList.filter((product) => product.is_active === false)
      setMyProductByFilter(productsInactive)
    } else {
      setMyProductByFilter(myProductsList)
    }
  }

  function handleNewAd() {
    navigation.navigate('CreateAd')
  }

  async function handleMyAdDetails(product_id: string) {
    navigation.navigate('MyAdDetails', { product_id })
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAd()
    }, []),
  )

  useEffect(() => {
    handleLoadProductsByFilter()
  }, [filter])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack bg="gray.600" flex={1}>
          <HStack alignItems="center" justifyContent="flex-end" mt={16} px={6}>
            <Heading color="gray.100" fontFamily="bold" fontSize="2xl" m="auto">
              Meus anúncios
            </Heading>
            <TouchableOpacity onPress={handleNewAd}>
              <Icon as={MaterialIcons} name="add" color="gray.100" size={8} />
            </TouchableOpacity>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" mt={8} mb={5} px={6}>
            <Text color="gray.200" fontFamily="regular" fontSize="md">
              {myProductsList.length} anúncios
            </Text>
            <Select
              minW={27}
              w={32}
              minH={9}
              py={2}
              px={3}
              dropdownCloseIcon={<Icon as={MaterialIcons} name="expand-more" mr={2} size={5} />}
              dropdownOpenIcon={<Icon as={MaterialIcons} name="expand-less" mr={2} size={5} />}
              placeholder="Todos"
              placeholderTextColor="gray.200"
              fontFamily="regular"
              fontSize="md"
              rounded="md"
              borderWidth={1}
              borderColor="gray.500"
            >
              <Select.Item label="Todos" value={filter} onPress={() => setFilter('todos')} />
              <Select.Item label="Ativos" value={filter} onPress={() => setFilter('ativos')} />
              <Select.Item label="Inativos" value={filter} onPress={() => setFilter('inativos')} />
            </Select>
          </HStack>

          <FlatList
            data={myProductByFilter}
            numColumns={2}
            px={6}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MyAdCard data={item} onPress={() => handleMyAdDetails(item.id)} />}
            ListEmptyComponent={
              <Text color="gray.200" fontFamily="bold" fontSize="sm" textAlign="center" mt="1/2">
                Você não tem nenhum anúncio.
              </Text>
            }
          />
        </VStack>
      )}
    </>
  )
}

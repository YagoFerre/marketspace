/* eslint-disable camelcase */
import { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, HStack, Heading, Icon, Select, Text, VStack } from 'native-base'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import { MyAdCard } from '@components/MyAdCard'

import { api } from '@services/api'

import { ProductDetailsDTO } from '@dtos/ProductDetailsDTO'

export function MyAd() {
  const [myAd, setMyAd] = useState<ProductDetailsDTO[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchMyAd() {
    try {
      const { data } = await api.get('/users/products')
      console.log(data)
      setMyAd(data)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  function handleNewAd() {
    navigation.navigate('CreateAd')
  }

  function handleMyAdDetails(product_id: string) {
    navigation.navigate('MyAdDetails', { product_id })
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAd()
    }, []),
  )

  return (
    <VStack px={6} bg="gray.600" flex={1}>
      <HStack alignItems="center" justifyContent="flex-end" mt={16}>
        <Heading color="gray.100" fontFamily="bold" fontSize="2xl" m="auto">
          Meus anúncios
        </Heading>
        <TouchableOpacity onPress={handleNewAd}>
          <Icon as={MaterialIcons} name="add" color="gray.100" size={8} />
        </TouchableOpacity>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center" mt={8} mb={5}>
        <Text color="gray.200" fontFamily="regular" fontSize="md">
          {myAd.length} anúncios
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
          <Select.Item label="Todos" value="todos" />
          <Select.Item label="Ativos" value="ativos" />
          <Select.Item label="Inativos" value="inativos" />
        </Select>
      </HStack>

      <FlatList
        data={myAd}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MyAdCard data={item} onPress={() => handleMyAdDetails(item.id)} />}
      />
    </VStack>
  )
}

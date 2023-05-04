import { useState } from 'react'
import { Box, Divider, IconButton, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import { HomeHeader } from '@components/HomeHeader'
import { SellInfoCard } from '@components/SellInfoCard'
import { Modal } from '@components/Modal'
import { Input } from '@components/Input'
import { MyAdCard } from '@components/MyAdCard'

export function Home() {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleMyAd() {
    navigation.navigate('MyAd')
  }

  function handleAdDetails() {
    navigation.navigate('AdDetails')
  }

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
      <Modal isOpen={modalIsVisible} onClose={() => setModalIsVisible(!modalIsVisible)} />

      <Box flexWrap="wrap" flexDirection="row" justifyContent="space-around" mt={5}>
        <MyAdCard active={false} isNew={true} onPress={handleAdDetails} />
        <MyAdCard active={true} isNew={false} onPress={handleAdDetails} />
        <MyAdCard active={true} isNew={false} onPress={handleAdDetails} />
        <MyAdCard active={false} isNew={true} onPress={handleAdDetails} />
      </Box>
    </VStack>
  )
}

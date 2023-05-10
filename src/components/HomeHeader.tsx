import { useEffect, useState } from 'react'
import { Box, HStack, Heading, Text, VStack, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { UserPhoto } from './UserPhoto'
import { Button } from './Button'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { UserDTO } from '@dtos/UserDTO'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

export function HomeHeader() {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const toast = useToast()

  async function loadUserInfo() {
    try {
      const { data } = await api.get('/users/me')
      setUser(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os dados do usuário. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNewAd() {
    navigation.navigate('CreateAd')
  }

  useEffect(() => {
    loadUserInfo()
  }, [])

  return (
    <HStack alignItems="center">
      <UserPhoto
        size={12}
        source={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : DefaultUserPhoto}
        mr={2}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontFamily="regular" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.100" fontFamily="bold" fontSize="md">
          {user.name}!
        </Heading>
      </VStack>
      <Box w="40%">
        <Button bg="gray.100" variant="tertiary" title="Criar anúncio" iconName="add" onPress={handleNewAd} />
      </Box>
    </HStack>
  )
}

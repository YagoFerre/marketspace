import { Box, HStack, Heading, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { UserPhoto } from './UserPhoto'
import { Button } from './Button'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNewAd() {
    navigation.navigate('CreateAd')
  }

  return (
    <HStack alignItems="center">
      <UserPhoto size={12} source={DefaultUserPhoto} mr={2} />
      <VStack flex={1}>
        <Text color="gray.100" fontFamily="regular" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.100" fontFamily="bold" fontSize="md">
          Yago!
        </Heading>
      </VStack>
      <Box w="40%">
        <Button bg="gray.100" variant="tertiary" title="Criar anúncio" iconName="add" onPress={handleNewAd} />
      </Box>
    </HStack>
  )
}

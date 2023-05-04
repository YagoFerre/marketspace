import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, ScrollView, Icon, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { ImageSlider } from '@components/ImageSlider'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'

export function MyAdDetails() {
  const m = ['boleto', 'pix', 'card', 'deposit']

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleEditAd() {
    navigation.navigate('EditAd')
  }

  function handleBack() {
    navigation.navigate('MyAd')
  }

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

        <ImageSlider />

        <HStack px={6} pt={5}>
          <UserPhoto source={DefaultUserPhoto} size={6} />
          <Text color="gray.100" fontFamily="regular" fontSize="md" ml={2}>
            Yago Ferreira
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
            novo
          </Text>
        </Box>

        <VStack px={6} mt={2}>
          <HStack justifyContent="space-between">
            <Heading fontFamily="bold" fontSize="xl">
              Luminária pendente
            </Heading>
            <Heading color="blue.light" fontFamily="bold" fontSize="xl">
              <Text color="blue.light" fontFamily="bold" fontSize="md">
                R$
              </Text>{' '}
              45,00
            </Heading>
          </HStack>
          <Text mt={2} fontFamily="regular" fontSize="md" color="gray.200">
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas
            urna mattis cursus.
          </Text>
        </VStack>

        <HStack px={6} mt={5}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200">
            Aceita troca?
          </Heading>
          <Text fontFamily="regular" fontSize="sm" color="gray.200" ml={2}>
            Não
          </Text>
        </HStack>

        <VStack px={6} mt={4}>
          <Heading fontFamily="bold" fontSize="md" color="gray.200" mt={4}>
            Meios de pagamento:
          </Heading>

          {m.map((m, index) => (
            <PaymentMethod key={m} methods={m} />
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

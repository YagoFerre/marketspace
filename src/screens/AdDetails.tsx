import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, Icon, ScrollView, Text, VStack } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { ImageSlider } from '@components/ImageSlider'
import { UserPhoto } from '@components/UserPhoto'
import { PaymentMethod } from '@components/PaymentMethod'
import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'

export function AdDetails() {
  const m = ['boleto', 'pix', 'card', 'deposit']

  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <TouchableOpacity
        style={{
          marginTop: 36,
          marginLeft: 24,
          marginBottom: 12,
        }}
        onPress={handleBack}
      >
        <Icon as={MaterialIcons} name="arrow-back" size={6} color="gray.100" />
      </TouchableOpacity>
      <ImageSlider active={true} />

      <ScrollView showsVerticalScrollIndicator={false} bg="gray.600">
        <HStack p={5}>
          <UserPhoto source={DefaultUserPhoto} size={6} />
          <Text color="gray.100" fontFamily="regular" fontSize="md" ml={2}>
            Yago Ferreira
          </Text>
        </HStack>

        <Box mx={5} px={2} py={1} bg="gray.500" rounded="full" w={12}>
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

        <VStack px={5} mt={3}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading fontFamily="bold">Bicicleta</Heading>
            <Heading color="blue.light" fontFamily="bold" fontSize="xl">
              <Text color="blue.light" fontFamily="bold" fontSize="md">
                R$
              </Text>{' '}
              120,00
            </Heading>
          </HStack>
          <Text mt={2} fontFamily="regular" fontSize="md" color="gray.200">
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas
            urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
            iaculis in aliquam.
          </Text>

          <HStack mt={5}>
            <Heading fontFamily="bold" fontSize="md" color="gray.200">
              Aceita troca?
            </Heading>
            <Text fontFamily="regular" fontSize="sm" color="gray.200" ml={2}>
              Sim
            </Text>
          </HStack>

          <Heading fontFamily="bold" fontSize="md" color="gray.200" mt={4} mb={2}>
            Meios de pagamento:
          </Heading>

          {m.map((m, index) => (
            <PaymentMethod key={m} methods={m} />
          ))}
        </VStack>

        <HStack py={5} px={6} mt={5} bg="gray.700" justifyContent="space-between" alignItems="center">
          <Heading color="blue.normal" fontFamily="bold" fontSize="2xl">
            <Text color="blue.normal" fontFamily="bold" fontSize="lg">
              R$
            </Text>{' '}
            120,00
          </Heading>
          <Button
            variant="secondary"
            iconName="contact-support"
            bg="blue.light"
            title="Entrar em contato"
            w="1/2"
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}

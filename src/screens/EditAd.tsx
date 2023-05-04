import { useState } from 'react'
import { Switch, TouchableOpacity } from 'react-native'
import {
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Radio,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'
import { Input } from '@components/Input'
import { CheckedGroup } from '@components/CheckedGroup'
import { Button } from '@components/Button'

export function EditAd() {
  const [isChecked, setIsChecked] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleEditAd() {
    navigation.navigate('MyAd')
  }

  function handleBack() {
    navigation.navigate('MyAdDetails')
  }

  return (
    <VStack pt={9} bg="gray.600" flex={1}>
      <ScrollView>
        <VStack px={6}>
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleBack}>
              <Icon as={MaterialIcons} name="arrow-back" color="gray.100" size={6} />
            </TouchableOpacity>
            <Center flex={1}>
              <Heading fontFamily="bold" color="gray.200" fontSize="2xl">
                Editar anúncio
              </Heading>
            </Center>
          </HStack>

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8}>
            Imagens
          </Heading>
          <Text fontFamily="regular" color="gray.300" fontSize="sm" mb={4}>
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>

          <HStack justifyContent="space-between">
            <IconButton
              size={27}
              rounded="md"
              _icon={{
                as: MaterialIcons,
                name: 'add',
                color: 'gray.400',
                size: 6,
              }}
              bg="gray.500"
            />

            <IconButton
              size={27}
              rounded="md"
              _icon={{
                as: MaterialIcons,
                name: 'add',
                color: 'gray.400',
                size: 6,
              }}
              bg="gray.500"
            />

            <IconButton
              size={27}
              rounded="md"
              _icon={{
                as: MaterialIcons,
                name: 'add',
                color: 'gray.400',
                size: 6,
              }}
              bg="gray.500"
            />
          </HStack>

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8}>
            Sobre o produto
          </Heading>

          <Input placeholder="Título do anúncio" mt={4} />
          <TextArea
            bg="gray.700"
            numberOfLines={5}
            h={40}
            p={4}
            borderWidth={0}
            placeholder="Descrição do produto"
            placeholderTextColor="gray.400"
            fontSize="md"
            color="gray.200"
            fontFamily="regular"
            mb={4}
            _focus={{
              borderWidth: 1,
              borderColor: 'gray.300',
              bg: 'gray.700',
            }}
            autoCompleteType={undefined}
          />

          <Radio.Group name="isNew">
            <HStack space={4} mt={2}>
              <Radio value="isNew" bg="transparent" colorScheme="blue" size="sm">
                Produto novo
              </Radio>
              <Radio value="isNotNew" bg="transparent" colorScheme="blue" size="sm">
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8} mb={4}>
            Venda
          </Heading>
          <Input
            placeholder="Valor do produto"
            InputLeftElement={
              <Text ml={4} fontSize="lg" fontFamily="regular">
                R$
              </Text>
            }
          />

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mb={2}>
            Aceita troca?
          </Heading>
          <Switch
            trackColor={{ true: '#647ac7', false: '' }}
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={4}>
            Meios de pagamento aceitos
          </Heading>
          <CheckedGroup value={paymentMethod} defaultValue={paymentMethod} onChange={setPaymentMethod} />
        </VStack>
        <HStack py={5} px={6} mt={5} bg="gray.700" justifyContent="space-between" alignItems="center">
          <Button title="Cancelar" w={36} onPress={handleBack} />
          <Button variant="tertiary" bg="gray.100" title="Avançar" w={36} onPress={handleEditAd} />
        </HStack>
      </ScrollView>
    </VStack>
  )
}

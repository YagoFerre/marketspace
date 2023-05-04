import { useState } from 'react'
import { Divider, HStack, Heading, IModalProps, Modal as NativeBaseModal, Text } from 'native-base'
import { Switch } from 'react-native'

import { Tag } from './Tag'
import { CheckedGroup } from './CheckedGroup'
import { Button } from './Button'

export function Modal({ ...rest }: IModalProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [isNew, setIsNew] = useState<boolean>()
  const [paymentMethod, setPaymentMethod] = useState<string[]>([])

  function handleResetAllFilters() {
    setIsChecked(false)
    setIsNew(undefined)
    setPaymentMethod([])
  }

  return (
    <NativeBaseModal avoidKeyboard justifyContent="flex-end" size="xl" animationPreset="slide" {...rest}>
      <NativeBaseModal.Content bg="gray.600" px={4} py={4} roundedTop="3xl">
        <Divider orientation="horizontal" thickness="3" rounded="full" w={12} m="auto" />
        <NativeBaseModal.Header bg="gray.600" borderBottomWidth={0} mt={4}>
          <NativeBaseModal.CloseButton color="gray.400" />

          <Heading color="gray.100" fontFamily="bold" fontSize="xl">
            Filtrar Anúncios
          </Heading>
        </NativeBaseModal.Header>

        <NativeBaseModal.Body>
          <Text color="gray.200" fontFamily="bold" fontSize="sm" mb={3}>
            Condição
          </Text>

          <HStack alignItems="center">
            <Tag mr={2} title="novo" onPress={() => setIsNew(true)} isActive={isNew === true} />
            <Tag title="usado" onPress={() => setIsNew(false)} isActive={isNew === false} />
          </HStack>

          <Text color="gray.200" fontFamily="bold" fontSize="sm" mt={6} mb={3}>
            Aceita troca?
          </Text>
          <Switch
            trackColor={{ true: '#647ac7', false: '' }}
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />

          <Text color="gray.200" fontFamily="bold" fontSize="sm" mt={6}>
            Meios de pagamento aceitos
          </Text>

          <CheckedGroup value={paymentMethod} defaultValue={paymentMethod} onChange={setPaymentMethod} />
          <HStack alignItems="center" justifyContent="space-between" mt={12}>
            <Button title="Resetar filtros" w="45%" onPress={handleResetAllFilters} />
            <Button bg="gray.100" variant="tertiary" title="Aplicar filtros" w="45%" />
          </HStack>
        </NativeBaseModal.Body>
      </NativeBaseModal.Content>
    </NativeBaseModal>
  )
}

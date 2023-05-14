import { Switch } from 'react-native'
import { Divider, HStack, Heading, IModalProps, Modal as NativeBaseModal, Text } from 'native-base'

import { Tag } from './Tag'
import { CheckedGroup } from './CheckedGroup'
import { Button } from './Button'

interface Props extends IModalProps {
  acceptTrade: boolean | undefined
  isNew: boolean | undefined
  paymentMethods: string[] | undefined
  onAcceptTradeChange: (value: boolean | undefined) => void
  onIsNewChange: (value: boolean | undefined) => void
  onPaymentMethodsChange: (value: string[]) => void
}

export function Modal({
  acceptTrade,
  isNew,
  paymentMethods,
  onAcceptTradeChange,
  onIsNewChange,
  onPaymentMethodsChange,
  ...rest
}: Props) {
  function handleResetAllFilters() {
    onAcceptTradeChange(false)
    onIsNewChange(undefined)
    onPaymentMethodsChange([])
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
            <Tag mr={2} title="novo" onPress={() => onIsNewChange(true)} isActive={isNew === true} />
            <Tag title="usado" onPress={() => onIsNewChange(false)} isActive={isNew === false} />
          </HStack>

          <Text color="gray.200" fontFamily="bold" fontSize="sm" mt={6} mb={3}>
            Aceita troca?
          </Text>
          <Switch
            trackColor={{ true: '#647ac7', false: '' }}
            value={acceptTrade}
            onValueChange={() => onAcceptTradeChange(!acceptTrade)}
          />

          <Text color="gray.200" fontFamily="bold" fontSize="sm" mt={6}>
            Meios de pagamento aceitos
          </Text>

          <CheckedGroup
            value={paymentMethods}
            defaultValue={paymentMethods}
            onChange={onPaymentMethodsChange}
          />
          <HStack alignItems="center" justifyContent="space-between" mt={12}>
            <Button title="Resetar filtros" w="45%" onPress={handleResetAllFilters} />
            <Button bg="gray.100" variant="tertiary" title="Aplicar filtros" w="45%" />
          </HStack>
        </NativeBaseModal.Body>
      </NativeBaseModal.Content>
    </NativeBaseModal>
  )
}

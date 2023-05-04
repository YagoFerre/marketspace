import { HStack, Icon, Text } from 'native-base'

import { Ionicons } from '@expo/vector-icons'

interface Props {
  methods: string
}

const icons: { [key: string]: string } = {
  boleto: 'barcode-outline',
  pix: 'qr-code-outline',
  card: 'card-outline',
  deposit: 'cash-outline',
}

export function PaymentMethod({ methods }: Props) {
  return (
    <HStack alignItems="center" py={1}>
      <Icon as={Ionicons} name={icons[methods]} size={5} color="gray.200" />
      <Text color="gray.200" textTransform="capitalize" ml={2} fontFamily="regular">
        {methods}
      </Text>
    </HStack>
  )
}

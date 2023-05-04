import { HStack, Heading, IPressableProps, Icon, Pressable, Text, VStack } from 'native-base'

import { MaterialIcons, Feather } from '@expo/vector-icons'

interface Props extends IPressableProps {}

export function SellInfoCard({ ...rest }: Props) {
  return (
    <Pressable
      bg={'blue.light:alpha.10'}
      p={4}
      alignItems="center"
      rounded="lg"
      flexDirection="row"
      _pressed={{
        bg: 'blue.normal:alpha.20',
      }}
      {...rest}
    >
      <Icon as={MaterialIcons} name="local-offer" color="blue.normal" opacity={100} size={6} />
      <VStack ml={4} flex={1}>
        <Heading color="gray.200" fontFamily="bold">
          4
        </Heading>
        <Text color="gray.200" fontFamily="regular">
          anúncios ativos
        </Text>
      </VStack>

      <HStack alignItems="center" justifyContent="center">
        <Text color="blue.normal" fontFamily="bold" fontSize="md">
          Meus anúncios
        </Text>
        <Icon as={Feather} name="arrow-right" color="blue.normal" size={5} ml={1} />
      </HStack>
    </Pressable>
  )
}

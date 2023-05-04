import { IPressableProps, Icon, Pressable, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

interface Props extends IPressableProps {
  title: string
  isActive?: boolean
}

export function Tag({ title, isActive, ...rest }: Props) {
  return (
    <Pressable
      py={2}
      px={4}
      flexDirection="row"
      justifyContent="center"
      alignContent="center"
      rounded="full"
      bg="gray.500"
      maxW={18}
      {...rest}
      isPressed={isActive}
      _pressed={{
        bg: 'blue.light',
      }}
    >
      <Text color={isActive ? 'white' : 'gray.300'} textTransform="uppercase" fontSize="xs" fontFamily="bold">
        {title}
      </Text>
      {isActive && <Icon as={MaterialIcons} name="cancel" color="white" ml={1} />}
    </Pressable>
  )
}

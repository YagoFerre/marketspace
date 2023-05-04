import { Button as NativeBaseButton, IButtonProps, Text, Icon, HStack } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

interface Props extends IButtonProps {
  title: string
  iconName?: string
  variant?: 'solid' | 'secondary' | 'tertiary'
}

export function Button({ title, iconName, variant = 'solid', ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg="gray.500"
      rounded="md"
      _pressed={{
        bg: variant === 'solid' ? 'gray.600' : variant === 'secondary' ? 'blue.normal' : 'gray.200',
      }}
      {...rest}
    >
      <HStack justifyContent="center" alignItems="center">
        {iconName ? (
          <Icon
            as={MaterialIcons}
            name={iconName}
            mr={2}
            color={variant === 'solid' ? 'gray.200' : 'gray.700'}
            size={4}
          />
        ) : undefined}
        <Text color={variant === 'solid' ? 'gray.200' : 'gray.700'} fontFamily="bold" fontSize="sm">
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  )
}

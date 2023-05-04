import { useState } from 'react'
import { FormControl, IInputProps, Icon, Input as NativeBaseInput } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

interface Props extends IInputProps {
  errorMessage?: string | null
}

export function InputPassword({ errorMessage = null, isInvalid, ...rest }: Props) {
  const [show, setShow] = useState(false)

  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={12}
        px={4}
        borderWidth={0}
        placeholderTextColor="gray.400"
        fontSize="md"
        color="gray.200"
        fontFamily="regular"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          borderWidth: 1,
          borderColor: 'gray.300',
          bg: 'gray.700',
        }}
        secureTextEntry={!show}
        InputRightElement={
          <Icon
            size={5}
            mr={3}
            as={MaterialIcons}
            name={show ? 'visibility' : 'visibility-off'}
            onPress={() => setShow(!show)}
          />
        }
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

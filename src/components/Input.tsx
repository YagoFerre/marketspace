import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

interface Props extends IInputProps {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
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
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

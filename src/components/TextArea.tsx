import { FormControl, ITextAreaProps, TextArea as NativeBaseTextArea } from 'native-base'

interface Props extends ITextAreaProps {
  errorMessage?: string | null
}

export function TextArea({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseTextArea
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
        _focus={{
          borderWidth: 1,
          borderColor: 'gray.300',
          bg: 'gray.700',
        }}
        autoCompleteType={undefined}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

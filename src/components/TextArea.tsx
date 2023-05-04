import { ITextAreaProps, TextArea as NativeBaseTextArea } from 'native-base'

export function TextArea({ ...rest }: ITextAreaProps) {
  return (
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
      mb={4}
      _focus={{
        borderWidth: 1,
        borderColor: 'gray.300',
        bg: 'gray.700',
      }}
      autoCompleteType={undefined}
      {...rest}
    />
  )
}

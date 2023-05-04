import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg="gray.500">
      <Spinner color="blue.light" />
    </Center>
  )
}

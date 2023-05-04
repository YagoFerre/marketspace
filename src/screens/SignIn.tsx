import { Center, Heading, ScrollView, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('SignUp')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack bgColor="gray.700" flex={1}>
        <VStack bgColor="gray.600" roundedBottomLeft={24} roundedBottomRight={24}>
          <Center my={20}>
            <LogoSvg />

            <Heading color="gray.100" fontFamily="bold" fontSize="4xl">
              marketspace
            </Heading>
            <Text color="gray.300" fontSize="sm" fontFamily="regular" lineHeight="sm">
              Seu espaço de compra e vendas
            </Text>
          </Center>

          <Center mx={12} mb={16}>
            <Text color="gray.200" fontFamily="regular" mb={4}>
              Acesse sua conta
            </Text>
            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
            <InputPassword placeholder="Senha" />

            <Button mt={4} bg="blue.light" variant="secondary" title="Entrar" />
          </Center>
        </VStack>

        <Center mx={12} my={16}>
          <Text color="gray.200" fontFamily="regular" mb={4}>
            Ainda não tem acesso?
          </Text>
          <Button title="Criar uma conta" onPress={handleNewAccount} />
        </Center>
      </VStack>
    </ScrollView>
  )
}

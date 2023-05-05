import { useState } from 'react'
import { Center, Heading, ScrollView, Text, VStack, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'

interface FormDataProps {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter ao menos 6 dígitos.'),
})

export function SignIn() {
  const [isSignIn, setIsSignIn] = useState(false)

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsSignIn(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível conectar. Tente novamente mais tarde.'
      setIsSignIn(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

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
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              mt={4}
              bg="blue.light"
              variant="secondary"
              title="Entrar"
              isLoading={isSignIn}
              onPress={handleSubmit(handleSignIn)}
            />
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

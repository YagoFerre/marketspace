/* eslint-disable camelcase */
import { useState } from 'react'
import { Center, Heading, IconButton, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'

import LogoSignUpSvg from '@assets/logo1.svg'
import DefaultUserPhoto from '@assets/userPhotoDefault.png'

import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { InputPassword } from '@components/InputPassword'
import { Button } from '@components/Button'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuth } from '@hooks/useAuth'

interface FormDataProps {
  name: string
  email: string
  tel: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  tel: yup.string().required('Informe o seu telefone.').min(13, 'Informe o DDI e o DDD: 5561234567890'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter ao menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
})

export function SignUp() {
  const [userPhoto, setUserPhoto] = useState<any>()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  const navigation = useNavigation()
  const toast = useToast()

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      setIsSignUp(true)

      const data = new FormData()
      data.append('name', name)
      data.append('email', email)
      data.append('tel', tel)
      data.append('password', password)

      const fileExtension = userPhoto.uri.split('.').pop()

      const photoFile = {
        name: `${name}.${fileExtension}`.toLowerCase(),
        uri: userPhoto.uri,
        type: `${userPhoto.type}/${fileExtension}`,
      } as any

      data.append('avatar', photoFile)

      await api.post('/users/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      await signIn(email, password)
    } catch (error) {
      setIsSignUp(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  async function handleSelectImage() {
    try {
      setIsPhotoLoading(true)

      const imageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (imageSelected.canceled) {
        return
      }

      if (imageSelected.assets[0].uri) {
        const imageInfo = await FileSystem.getInfoAsync(imageSelected.assets[0].uri, { size: true })

        if (imageInfo.exists && imageInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setUserPhoto(imageSelected.assets[0])
      }
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setIsPhotoLoading(false)
    }
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.600">
        <Center my={8} mx={12}>
          <LogoSignUpSvg />

          <Heading color="gray.100" fontFamily="bold" fontSize="xl" mt={4}>
            Boas Vindas!
          </Heading>
          <Text textAlign="center" color="gray.200" fontFamily="regular" fontSize="sm" mt={2}>
            Crie sua conta e use o espaço para comprar{'\n'} itens variados e vender seus produtos
          </Text>
        </Center>

        <Center mx={12}>
          {isPhotoLoading ? (
            <Skeleton w={24} h={24} rounded="full" startColor="gray.500" endColor="gray.400" />
          ) : (
            <UserPhoto size={24} source={!userPhoto ? DefaultUserPhoto : { uri: userPhoto.uri }} />
          )}

          <IconButton
            onPress={handleSelectImage}
            mt={-8}
            mr={-12}
            size={10}
            rounded="full"
            _icon={{
              as: MaterialIcons,
              name: 'border-color',
              color: 'gray.600',
            }}
            bg="blue.light"
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                mt={4}
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="tel"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                keyboardType="phone-pad"
                value={value}
                errorMessage={errors.tel?.message}
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
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputPassword
                placeholder="Confirme a senha"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            mt={4}
            variant="tertiary"
            bg="gray.100"
            title="Criar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSignUp}
          />
        </Center>

        <Center mx={12} my={16}>
          <Text color="gray.200" fontFamily="regular" mb={4}>
            Já tem uma conta?
          </Text>
          <Button title="Ir para o login" onPress={handleBack} />
        </Center>
      </VStack>
    </ScrollView>
  )
}

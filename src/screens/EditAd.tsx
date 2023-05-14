/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable no-unneeded-ternary */
import { useEffect, useState } from 'react'
import { Switch, TouchableOpacity } from 'react-native'
import {
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Radio,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MaterialIcons } from '@expo/vector-icons'

import { Input } from '@components/Input'
import { CheckedGroup } from '@components/CheckedGroup'
import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'
import { ImageProduct } from '@components/ImageProduct'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '@hooks/useAuth'
import { ProductDTO } from '@dtos/ProductDTO'

import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { AppError } from '@utils/AppError'
import { api } from '@services/api'

interface PaymentProps {
  key: string
  method: string
}

interface RouteParamsProps {
  product_id: string
}

const editAdSchema = yup.object({
  name: yup.string().required('Informe o nome do produto.'),
  description: yup.string().required('Informe a descrição do produto.'),
  is_new: yup.string().required('Informe se aceita troca ou não.'),
  price: yup.string().required('O preço é obrigatório.'),
  accept_trade: yup.boolean().required('Informe se aceita troca ou não.'),
  payment_methods: yup.array(yup.string()).min(1, 'Informe ao menos um método de pagamento.'),
})

export function EditAd() {
  const { user } = useAuth()
  const [productImages, setProductImages] = useState<any[]>([])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductDTO>({
    resolver: yupResolver(editAdSchema),
    defaultValues: {
      is_new: '',
      payment_methods: [],
    },
  })

  const toast = useToast()

  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { product_id } = route.params as RouteParamsProps

  async function loadProduct() {
    try {
      const { data } = await api.get(`/products/${product_id}`)
      const product = {
        ...data,
        is_new: String(data.is_new),
        price: String(data.price / 100),
        payment_methods: data.payment_methods.map((payment: PaymentProps) => payment.key),
      }

      reset(product)
      setProductImages(data.product_images)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi carregar seus anúncios. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  async function handleSelectProductImages() {
    try {
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

        const fileExtension = imageSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: imageSelected.assets[0].uri,
          type: `${imageSelected.assets[0].type}/${fileExtension}`,
        } as any

        if (photoFile.length < 2) {
          return toast.show({
            title: 'Selecione no mínimo 2 imagens.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setProductImages((prevState) => [...prevState, photoFile])
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function handleUpdateProduct(productUpdated: ProductDTO) {
    try {
      const images = productImages

      await api.put(`/products/${product_id}`, {
        name: productUpdated.name,
        description: productUpdated.description,
        is_new: productUpdated.is_new === 'true' ? true : false,
        accept_trade: productUpdated.accept_trade,
        payment_methods: productUpdated.payment_methods,
        price: Number(productUpdated.price) * 100,
        product_images: images,
      })

      images.map(async (image) => {
        if (image.uri) {
          const dataForm = new FormData()
          dataForm.append('product_id', product_id)
          dataForm.append('images', image)

          await api.post('/products/images', dataForm, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }
      })

      navigation.navigate('MyAd')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi atualizar o produto. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  async function handleRemoveProductImage(id: string, uri: string) {
    try {
      if (id) {
        const updatedImages = productImages.filter((image) => image.id !== id)
        setProductImages(updatedImages)
        await api.delete('/products/images', {
          data: {
            productImagesIds: [id],
          },
        })
      }

      const updatedImages = productImages.filter((image) => image.uri !== uri)
      setProductImages(updatedImages)
    } catch (error: any) {
      console.log(error)
    }
  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    loadProduct()
  }, [reset, product_id])

  return (
    <VStack pt={9} bg="gray.600" flex={1}>
      <ScrollView>
        <VStack px={6}>
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleBack}>
              <Icon as={MaterialIcons} name="arrow-back" color="gray.100" size={6} />
            </TouchableOpacity>
            <Center flex={1}>
              <Heading fontFamily="bold" color="gray.200" fontSize="2xl">
                Editar anúncio
              </Heading>
            </Center>
          </HStack>

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8}>
            Imagens
          </Heading>
          <Text fontFamily="regular" color="gray.300" fontSize="sm" mb={4}>
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>

          <HStack space={7}>
            {productImages.map((image, index) => (
              <ImageProduct
                key={index}
                source={
                  image.id ? { uri: `${api.defaults.baseURL}/images/${image.path}` } : { uri: image.uri }
                }
                // source={image}
                onRemove={() => handleRemoveProductImage(image.id, image.uri)}
              />
            ))}

            {productImages.length <= 2 && (
              <IconButton
                onPress={handleSelectProductImages}
                size={27}
                rounded="md"
                _icon={{
                  as: MaterialIcons,
                  name: 'add',
                  color: 'gray.400',
                  size: 6,
                }}
                bg="gray.500"
              />
            )}
          </HStack>

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8}>
            Sobre o produto
          </Heading>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do anúncio"
                mt={4}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea onChangeText={onChange} value={value} errorMessage={errors.description?.message} />
            )}
          />

          <Controller
            name="is_new"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Radio.Group name="is_new" onChange={onChange} value={value}>
                <HStack space={4} mt={2}>
                  <Radio value="true" bg="transparent" colorScheme="blue" size="sm">
                    Produto novo
                  </Radio>
                  <Radio value="false" bg="transparent" colorScheme="blue" size="sm">
                    Produto usado
                  </Radio>
                </HStack>
              </Radio.Group>
            )}
          />
          {errors?.is_new && (
            <Text color="red.500" fontSize="sm">
              {errors.is_new.message}
            </Text>
          )}

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={8} mb={4}>
            Venda
          </Heading>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="Valor do produto"
                InputLeftElement={
                  <Text ml={4} fontSize="lg" fontFamily="regular">
                    R$
                  </Text>
                }
                errorMessage={errors.price?.message}
              />
            )}
          />

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mb={2}>
            Aceita troca?
          </Heading>

          <Controller
            name="accept_trade"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ true: '#647ac7', false: '' }}
                value={value}
                onValueChange={() => onChange(!value)}
              />
            )}
          />

          <Heading fontFamily="bold" color="gray.200" fontSize="md" mt={4}>
            Meios de pagamento aceitos
          </Heading>

          <Controller
            name="payment_methods"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => <CheckedGroup value={value} onChange={onChange} />}
          />
          {errors?.payment_methods && (
            <Text color="red.500" fontSize="sm">
              {errors.payment_methods.message}
            </Text>
          )}
        </VStack>
        <HStack py={5} px={6} mt={5} bg="gray.700" justifyContent="space-between" alignItems="center">
          <Button title="Cancelar" w={36} onPress={handleBack} />
          <Button
            variant="tertiary"
            bg="gray.100"
            title="Avançar"
            w={36}
            onPress={handleSubmit(handleUpdateProduct)}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}

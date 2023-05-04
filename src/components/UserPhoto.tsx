import { IImageProps, Image } from 'native-base'

interface Props extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image
      alt="Foto do usuário"
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="blue.light"
      {...rest}
    />
  )
}

import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    blue: {
      normal: '#364d9d',
      light: '#647ac7',
    },
    gray: {
      700: '#F7F7F8',
      600: '#EDECEE',
      500: '#D9D8DA',
      400: '#9F9BA1',
      300: '#5F5B62',
      200: '#3E3A40',
      100: '#1A181B',
    },
    white: '#FFFFFF',
    red: {
      light: '#EE7979',
    },
  },
  fonts: {
    bold: 'Karla_700Bold',
    regular: 'Karla_400Regular',
  },
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    15: 50,
    18: 76,
    27: 100,
    29: 121,
    33: 153,
    36: 157,
    100: 500,
  },
})

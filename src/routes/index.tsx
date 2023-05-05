import { Box, useTheme } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { user } = useAuth()
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[600]

  return (
    <Box flex={1} bg="gray.600">
      <NavigationContainer theme={theme}>{user.id ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>
    </Box>
  )
}

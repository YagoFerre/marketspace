import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AdDetails } from '@screens/AdDetails'
import { CreateAd } from '@screens/CreateAd'
import { EditAd } from '@screens/EditAd'
import { Home } from '@screens/Home'
import { MyAd } from '@screens/MyAd'
import { MyAdDetails } from '@screens/MyAdDetails'
import { PreviewAd } from '@screens/PreviewAd'
import { Logout } from '@screens/Logout'

import { useAuth } from '@hooks/useAuth'

import HomeSvg from '@assets/home.svg'
import TagSvg from '@assets/tag.svg'
import SignOutSvg from '@assets/signout.svg'

type AppRoutesProps = {
  Home: undefined
  CreateAd: undefined
  EditAd: undefined
  MyAd: undefined
  AdDetails: undefined
  MyAdDetails: undefined
  PreviewAd: undefined
  Logout: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes() {
  const { signOut } = useAuth()
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 65,
        },
        // tabBarItemStyle: {
        //   justifyContent: 'center',
        // },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize} />,
        }}
      />
      <Screen
        name="MyAd"
        component={MyAd}
        options={{
          tabBarIcon: ({ color }) => <TagSvg fill={color} width={iconSize} height={iconSize} />,
        }}
      />

      <Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: () => <SignOutSvg fill={colors.red[500]} width={iconSize} height={iconSize} />,
        }}
        listeners={() => ({
          tabPress: async () => await signOut(),
        })}
      />

      <Screen
        name="AdDetails"
        component={AdDetails}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="CreateAd"
        component={CreateAd}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="PreviewAd"
        component={PreviewAd}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="MyAdDetails"
        component={MyAdDetails}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="EditAd"
        component={EditAd}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}

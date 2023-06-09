/* eslint-disable camelcase */
import { ReactNode, createContext, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'

import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser'
import { storageUserTokenGet, storageUserTokenRemove, storageUserTokenSave } from '@storage/storageAuthToken'

export interface AuthContextDataProps {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

interface AuthContextDataProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextDataProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  async function storageUserAndTokenData(userData: UserDTO, token: string, refresh_token: string) {
    try {
      await storageUserSave(userData)
      await storageUserTokenSave(token, refresh_token)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenData(data.user, data.token, data.refresh_token)

        updateUserAndToken(data.user, data.token)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signOut() {
    try {
      setUser({} as UserDTO)

      await storageUserRemove()
      await storageUserTokenRemove()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      const { token } = await storageUserTokenGet()

      if (userLogged && token) {
        updateUserAndToken(userLogged, token)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

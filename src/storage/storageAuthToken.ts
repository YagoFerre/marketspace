import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from './storageConfig'

export async function storageUserTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function storageUserTokenGet() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  return token
}

export async function storageUserTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}

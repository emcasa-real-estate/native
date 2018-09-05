import _ from 'lodash'
import {AsyncStorage} from 'react-native'

export const JWT_CACHE_KEY = '__emcasa_jwt'

// TODO - Use secure storage
export const getJwt = async () => AsyncStorage.getItem(JWT_CACHE_KEY)

export const setJwt = async (jwt) => AsyncStorage.setItem(JWT_CACHE_KEY, jwt)

export const resetJwt = () => AsyncStorage.removeItem(JWT_CACHE_KEY)

export async function storeCredentials(_, {jwt, user}) {
  if (!jwt) await resetJwt()
  else await setJwt(jwt)
  return {
    __typename: 'Credentials',
    jwt,
    user
  }
}

import {AsyncStorage} from 'react-native'

export const JWT_CACHE_KEY = '__emcasa_jwt'

// TODO - Use secure storage
export const getJwt = async () => AsyncStorage.getItem(JWT_CACHE_KEY)

export const setJwt = async (jwt) => AsyncStorage.setItem(JWT_CACHE_KEY, jwt)

export const resetJwt = () => AsyncStorage.removeItem(JWT_CACHE_KEY)

export async function storeCredentials(_, {jwt, user}, {graphql}) {
  if (!jwt) {
    await resetJwt()
    await graphql.resetStore()
  } else {
    await setJwt(jwt)
    await graphql.sync()
  }
  return {
    __typename: 'Credentials',
    jwt,
    user
  }
}

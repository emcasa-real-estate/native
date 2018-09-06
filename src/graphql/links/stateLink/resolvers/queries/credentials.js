import {getJwt} from '../mutations/credentials'

export default async function credentials(prev = {}) {
  return {
    ...prev,
    __typename: 'Credentials',
    jwt: (await getJwt()) || null
  }
}

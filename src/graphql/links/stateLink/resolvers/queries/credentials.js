import {getJwt} from '../mutations/credentials'

export default async function credentials(prev = {}) {
  console.log('!!!!!!!!')
  return {
    ...prev,
    __typename: 'Credentials',
    jwt: (await getJwt()) || null
  }
}

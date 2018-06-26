import {HttpLink} from 'apollo-link-http'

import {API_URL} from '@/lib/config'

export default () =>
  new HttpLink({
    uri: `${API_URL}/graphql_api`,
    credentials: 'same-origin'
  })

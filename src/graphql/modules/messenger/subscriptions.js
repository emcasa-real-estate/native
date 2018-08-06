import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const MESSAGE_SENT = gql`
  subscription messageSent {
    messageSent {
      ...Message
    }
  }
  ${frag.Message}
`

import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {ApolloLink} from 'apollo-link'
import {Socket} from 'phoenix'

export default class WebSocketLink extends ApolloLink {
  token = null

  constructor(url) {
    super()
    this.url = url
  }

  updateLink(token) {
    this.token = token
    this.link = createAbsintheSocketLink(
      AbsintheSocket.create(
        new Socket(this.url, {params: {Authorization: this.token}})
      )
    )
  }

  request(operation, forward) {
    const token = operation.getContext().headers.Authorization
    if (!this.link || token !== this.token) this.updateLink(token)
    return this.link.request(operation, forward)
  }
}

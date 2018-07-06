import createStore from '@/redux'
import createApolloClient from '@/graphql/client'

export default new class Client {
  constructor() {
    this.store = createStore(this)
    createApolloClient(this).then((apolloClient) => {
      this.graphql = apolloClient
    })
  }
}()

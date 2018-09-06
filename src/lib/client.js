import createStore from '@/redux'
import createApolloClient from '@/graphql/client'

export default new class Client {
  ready = (async () => {
    this.graphql = await createApolloClient(this)
    this.store = createStore(this)
  })()
}()

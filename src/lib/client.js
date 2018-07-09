import createStore from '@/redux'
import createApolloClient from '@/graphql/client'

export default new class Client {
  ready = (async () => {
    this.store = createStore(this)
    this.graphql = await createApolloClient(this)
  })()
}()

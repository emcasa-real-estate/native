import createStore from '@/redux'
import createApolloClient from '@/graphql/client'

export default new class Client {
  store = createStore(this)
  graphql = createApolloClient(this)
}()

import createStore from '@/redux'
import createApolloClient from '@/graphql/client'

export const READY = '@@CLIENT_READY'

export default new class Client {
  ready = (async () => {
    this.store = createStore(this)
    this.graphql = await createApolloClient(this)
    this.store.dispatch({type: READY})
  })()
}()

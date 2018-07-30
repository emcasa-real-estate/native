import * as Mutation from './mutations'

export default {
  defaults: {
    userProfile: {
      __typename: 'User',
      blacklists: []
    }
  },
  resolvers: {Mutation}
}

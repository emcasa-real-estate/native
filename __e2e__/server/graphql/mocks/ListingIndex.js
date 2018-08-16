import {MockList} from 'graphql-tools'

export default () => ({
  listings: () => new MockList(15),
  remainingCount: 100
})

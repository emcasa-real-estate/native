import stateLink from '../stateLink'

export default (options) => {
  return new Map([['state', stateLink(options)]])
}

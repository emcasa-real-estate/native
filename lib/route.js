import _ from 'lodash'

// Get last route in the stack from react-navigation's navigation object
export const last = (state) => {
  if (!state.routes) return state
  const result = _.last(state.routes)
  if (!result.routes || !result.routes.length) return result
  return last(result)
}

// Get next stack
export const next = (state) => {
  if (!state.routes) return undefined
  return _.last(state.routes)
}

export const lastStack = (state) => {
  if (!state.routes) throw new Error(`${state.key} is not a stack navigator`)
  if (!state.routes.length) return state
  const route = _.last(state.routes)
  if (!route.routes) return state
  return lastStack(route)
}

export const getStack = ({state, dangerouslyGetParent}) => {
  if (!dangerouslyGetParent) return []
  const parent = dangerouslyGetParent()
  return getStack(parent).concat({
    key: state.key,
    routeName: state.routeName
  })
}

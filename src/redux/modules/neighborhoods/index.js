export const REQUEST = 'neighborhoods/REQUEST'
export const SUCCESS = 'neighborhoods/SUCCESS'
export const FAILURE = 'neighborhoods/FAILURE'

export const request = () => ({type: REQUEST})
export const success = (data) => ({type: SUCCESS, data})
export const failure = (error) => ({type: FAILURE, error})

export default function neighborhoods(state = [], action) {
  switch (action.type) {
    case SUCCESS:
      return action.data
    default:
      return state
  }
}

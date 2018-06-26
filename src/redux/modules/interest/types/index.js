export const REQUEST = 'interest/types/REQUEST'
export const SUCCESS = 'interest/types/SUCCESS'
export const FAILURE = 'interest/types/FAILURE'

export const request = () => ({type: REQUEST})
export const success = (data) => ({type: SUCCESS, data})
export const failure = (error) => ({type: FAILURE, error})

export default function interestTypes(state = [], action) {
  switch (action.type) {
    case SUCCESS:
      return action.data
    default:
      return state
  }
}

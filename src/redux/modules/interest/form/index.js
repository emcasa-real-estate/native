export const REQUEST = 'interest/form/REQUEST'
export const SUCCESS = 'interest/form/SUCCESS'
export const FAILURE = 'interest/form/FAILURE'

export const request = (id, params) => ({type: REQUEST, id, params})
export const success = (data) => ({type: SUCCESS, data})
export const failure = (error) => ({type: FAILURE, error})

const initialState = {
  loading: false,
  error: undefined,
  data: undefined
}

export default function interestForm(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.data
      }
    case FAILURE:
      return {
        loading: false,
        error: action.error,
        data: undefined
      }
    default:
      return state
  }
}

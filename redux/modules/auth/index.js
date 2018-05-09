export const SIGN_IN = 'auth/SIGN_IN'
export const SIGN_UP = 'auth/SIGN_UP'
export const SIGN_OUT = 'auth/SIGN_OUT'
export const RESET_PASSWORD = 'auth/RESET_PASSWORD'
export const REQUEST = 'auth/REQUEST'
export const PATCH = 'auth/PATCH'
export const SUCCESS = 'auth/SUCCESS'
export const FAILURE = 'auth/FAILURE'
export const RESET = 'auth/RESET'

export const signIn = ({email, password}) => ({
  type: SIGN_IN,
  email,
  password
})
export const signUp = ({name, email, password}) => ({
  type: SIGN_UP,
  name,
  email,
  password
})
export const signOut = () => ({type: SIGN_OUT})
export const resetPassword = ({email}) => ({type: RESET_PASSWORD, email})
export const reset = () => ({type: RESET})
export const request = () => ({type: REQUEST})
export const patch = (user) => ({type: PATCH, user})
export const success = ({user, data}) => ({type: SUCCESS, user, data})
export const failure = (error) => ({type: FAILURE, error})

const initialState = {
  user: undefined,
  data: undefined,
  loading: false,
  error: undefined
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return {...state, user: null}
    case RESET:
      return {...state, loading: false, error: undefined}
    case REQUEST:
      return {...state, loading: true}
    case PATCH:
      return {...state, user: {...state.user, ...action.user}}
    case SUCCESS:
      return {loading: false, user: action.user, data: action.data}
    case FAILURE:
      return {
        loading: false,
        error: {
          message: action.error.message,
          status: action.error.status
        }
      }
    default:
      return state
  }
}

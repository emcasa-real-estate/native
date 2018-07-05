export const UPDATE_TOKEN = 'firebase/messaging/UPDATE_TOKEN'
export const UPDATE_PERMISSION = 'firebase/messaging/UPDATE_PERMISSION'
export const REQUEST_PERMISSION = 'firebase/messaging/REQUEST_PERMISSION'

export const updateToken = (token) => ({type: UPDATE_TOKEN, token})
export const requestPermission = () => ({type: REQUEST_PERMISSION})
export const updatePermission = (granted) => ({
  type: UPDATE_PERMISSION,
  granted
})

export const initialState = {
  hasPermission: undefined,
  token: undefined
}

export default function fcmReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.token}
    case UPDATE_PERMISSION:
      return {...state, hasPermission: action.granted}
    default:
      return state
  }
}

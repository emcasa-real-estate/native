export const UPDATE_TOKEN = 'firebase/messaging/UPDATE_TOKEN'

export const updatePermission = (token) => ({type: UPDATE_TOKEN, token})

export const initialState = {
  permission: undefined,
  token: undefined
}

export default function fcmReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.token}
    default:
      return state
  }
}

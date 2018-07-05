export const UPDATE_TOKEN = 'firebase/messaging/UPDATE_TOKEN'
export const UPDATE_PERMISSION = 'firebase/messaging/UPDATE_PERMISSION'
export const REQUEST_PERMISSION = 'firebase/messaging/REQUEST_PERMISSION'
// Notification received while app is opened
export const NOTIFICATION_RECEIVED = 'firebase/messaging/NOTIFICATION_RECEIVED'
// Notification opened while app is in background
export const NOTIFICATION_OPENED = 'firebase/messaging/NOTIFICATION_OPENED'
// App was opened by a notification
export const NOTIFICATION_INITIALIZED =
  'firebase/messaging/NOTIFICATION_INITIALIZED'

export const updateToken = (token) => ({type: UPDATE_TOKEN, token})
export const requestPermission = () => ({type: REQUEST_PERMISSION})
export const updatePermission = (granted) => ({
  type: UPDATE_PERMISSION,
  granted
})
export const notificationReceived = (notification) => ({
  type: NOTIFICATION_RECEIVED,
  notification
})
export const notificationOpened = (notification, action) => ({
  type: NOTIFICATION_OPENED,
  notification,
  action
})
export const notificationInitialized = (notification, action) => ({
  type: NOTIFICATION_INITIALIZED,
  notification,
  action
})

export const initialState = {
  hasPermission: undefined,
  token: undefined,
  initialNotification: undefined
}

export default function fcmReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.token}
    case UPDATE_PERMISSION:
      return {...state, hasPermission: action.granted}
    case NOTIFICATION_INITIALIZED:
      return {
        ...state,
        initialNotification: {
          notification: action.notification,
          action: action.action
        }
      }
    default:
      return state
  }
}

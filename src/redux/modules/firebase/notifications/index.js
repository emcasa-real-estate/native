// Notification received while app is opened
export const NOTIFICATION_RECEIVED = 'firebase/messaging/NOTIFICATION_RECEIVED'
// Notification opened while app is in background
export const NOTIFICATION_OPENED = 'firebase/messaging/NOTIFICATION_OPENED'
// App was opened by a notification
export const NOTIFICATION_INITIALIZED =
  'firebase/messaging/NOTIFICATION_INITIALIZED'

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
  initialNotification: undefined
}

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
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

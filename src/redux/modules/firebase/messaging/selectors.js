export const getFirebaseMessaging = (state) => state.firebase.messaging
export const getDeviceToken = (state) => getFirebaseMessaging(state).token
export const hasPermission = (state) =>
  getFirebaseMessaging(state).hasPermission

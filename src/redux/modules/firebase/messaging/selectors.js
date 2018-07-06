export const getFirebaseMessaging = (state) => state.firebase.messaging
export const getToken = (state) => getFirebaseMessaging(state).hasPermission
export const hasPermission = (state) => getFirebaseMessaging(state).token

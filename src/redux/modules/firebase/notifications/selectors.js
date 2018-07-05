export const getFirebaseNotifications = (state) => state.firebase.notifications
export const getInitialNotification = (state) =>
  getFirebaseNotifications(state).initialNotification

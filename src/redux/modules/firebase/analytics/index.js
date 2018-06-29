export const LOG_EVENT = 'firebase/analytics/LOG_EVENT'

export const logEvent = (name, params = {}) => ({
  type: LOG_EVENT,
  name,
  params
})

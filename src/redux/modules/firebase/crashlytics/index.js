export const REPORT_ERROR = 'fabric/REPORT_ERROR'

export const reportError = (error, code = -1) => ({
  type: REPORT_ERROR,
  error,
  code
})

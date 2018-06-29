import Error from 'es6-error'

export default class ResponseError extends Error {
  constructor(response, data) {
    const {status, statusText} = response
    let message = `[${status}] ${statusText}`
    if (data && data.errors) message = data.errors.detail
    super(message)
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

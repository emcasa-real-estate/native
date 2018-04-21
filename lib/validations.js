import _ from 'lodash/fp'
import {validate as validateEmail} from 'email-validator'

const createValidation = (fun, defaultMessage = '') => (message) => (value) => {
  if (!fun(value)) return message || defaultMessage
}

export const required = createValidation(_.identity, 'Este campo é obrigatório')

export const email = createValidation(validateEmail, 'Este email é inválido')

const countryCode = '(\\+?\\d{1,3}|\\d{1,4})?'
const areaCode = '\\(?\\d{2,3}\\)?'
const number = '\\d{3,5}'
const sep = '[ \\-]?'
const pattern = countryCode + sep + areaCode + sep + number + sep + number
const EXPRESSION = new RegExp(`^${pattern}\\s*$`)

export const phone = createValidation(
  (value) => !EXPRESSION.test(value),
  'Este número não é inválido'
)

import _ from 'lodash/fp'
import {validate as validateEmail} from 'email-validator'

const createValidation = (fun, defaultMessage = '') => (message) => (value) => {
  if (!fun(value)) return message || defaultMessage
}

export const required = createValidation(_.identity, 'Este campo é obrigatório')

export const email = createValidation(validateEmail, 'Este email é inválido')

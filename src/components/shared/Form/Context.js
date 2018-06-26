import React from 'react'

export const {Consumer, Provider} = React.createContext({
  value: {},
  validation: {},
  onSubscribe: () => null,
  onUnsubscribe: () => null,
  onChangeField: () => () => null,
  onValidateField: () => () => null,
  onValidate: () => true
})

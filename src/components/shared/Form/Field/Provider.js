import _ from 'lodash/fp'
import {PureComponent} from 'react'

import {withForm} from '../Form/Provider'

const OK = {valid: true, errors: []}

const validate = (validations) => (value) =>
  validations.reduce(({valid, errors}, fun) => {
    const error = fun(value)
    if (error) return {valid: false, errors: errors.concat(error)}
    else return {valid, errors}
  }, OK)

export const withField = (Target) =>
  withForm(({name, value, validation, focus, ...props}) => (
    <Target
      {...props}
      {...validation[name] || OK}
      value={value[name]}
      validation={undefined}
      focus={focus === name}
      name={name}
    />
  ))

export const field = (Target) =>
  withField(
    ({
      children,
      onSubscribe,
      onUnsubscribe,
      onChangeField,
      onValidateField,
      validations,
      ...props
    }) => (
      <FieldProvider
        name={props.name}
        value={props.value}
        validations={validations}
        onSubscribe={onSubscribe}
        onUnsubscribe={onUnsubscribe}
        onChangeField={onChangeField}
        onValidateField={onValidateField}
        onFocusField={props.onFocusField}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {(ctx) => (
          <Target {...props} {...ctx}>
            {children}
          </Target>
        )}
      </FieldProvider>
    )
  )

export default class FieldProvider extends PureComponent {
  static defaultProps = {
    validations: []
  }

  componentDidMount() {
    const {name, onSubscribe} = this.props
    onSubscribe(name, this)
  }

  componentWillUnmount() {
    const {name, onUnsubscribe} = this.props
    onUnsubscribe(name, this)
  }

  validate = (value) => validate(this.props.validations)(value)

  onValidate = () => {
    const {onValidateField, name} = this.props
    const state = this.validate(this.props.value)
    this.setState(state)
    onValidateField(name, state)
    return state.valid
  }

  onFocus = () => {
    const {name, onFocus, onFocusField} = this.props
    onFocusField(name)
    if (onFocus) onFocus()
  }

  onChange = (_value, callback) => {
    const {onChangeField, onChange, name} = this.props
    let value = _value
    if (onChange) {
      const result = onChange(value)
      value = typeof result !== 'undefined' ? result : value
    }
    onChangeField(name, value, callback)
  }

  render() {
    const {children} = this.props

    return children({
      onFocus: this.onFocus,
      onValidate: this.onValidate,
      onChange: this.onChange
    })
  }
}

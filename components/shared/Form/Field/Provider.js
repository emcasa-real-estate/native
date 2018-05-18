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
  withForm(({name, value, validation, ...props}) => (
    <Target
      {...props}
      {...validation[name] || OK}
      value={value[name] || ''}
      validation={undefined}
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

  state = {
    focus: false
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
    const {onFocus} = this.props
    this.setState({focus: true})
    if (onFocus) onFocus()
  }

  onBlur = () => {
    const {onBlur} = this.props
    this.setState({focus: false})
    if (onBlur) onBlur()
  }

  onChange = (value) => {
    const {onChangeField, onChange, name} = this.props
    onChangeField(name, value)
    if (onChange) onChange(value)
  }

  render() {
    const {children} = this.props

    return children({
      ...this.state,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onValidate: this.onValidate,
      onChange: this.onChange
    })
  }
}

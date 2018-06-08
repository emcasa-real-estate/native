import _ from 'lodash/fp'
import {PureComponent} from 'react'

import {Provider, Consumer} from '../Context'

const isValid = _.flow(
  _.values,
  _.findIndex((value) => value === false),
  (index) => index === -1
)

export const withForm = (Target) => (props) => (
  <Consumer>{(ctx) => <Target {...props} {...ctx} />}</Consumer>
)

export const form = (Target) => ({
  onChange,
  onValidate,
  onSubmit,
  defaultValue,
  value,
  formRef,
  ...props
}) => (
  <FormProvider
    ref={formRef}
    onChange={onChange}
    onValidate={onValidate}
    onSubmit={onSubmit}
    defaultValue={defaultValue}
    value={value}
  >
    <Consumer>{(ctx) => <Target {...props} {...ctx} />}</Consumer>
  </FormProvider>
)

export default class FormProvider extends PureComponent {
  state = {
    focus: undefined,
    valid: true,
    value: {},
    fields: {},
    validation: {}
  }

  static getDerivedStateFromProps({value, defaultValue}, state) {
    if (!_.isEmpty(value) && !_.isEqual(value, state.value))
      return {value, valid: false}
    if (!_.isEmpty(defaultValue) && _.isEmpty(state.value))
      return {value: defaultValue, valid: false}
    return null
  }

  componentDidUpdate() {
    if (typeof this.state.valid === 'undefined') this.onValidate()
  }

  onSubscribe = (name, node) => {
    this.setState(({fields}) => ({fields: {...fields, [name]: node}}))
  }

  onUnsubscribe = (name, node) => {
    if (node !== this.state.fields[name]) return
    this.setState(({fields}) => ({fields: _.omit(name)(fields)}))
  }

  onValidate = () => {
    const {fields} = this.state
    const valid = Object.values(fields).reduce(
      (valid, field) => field.onValidate() && valid,
      true
    )
    this.setState({valid})
    return valid
  }

  onValidateField = (field, value) => {
    const {onValidate} = this.props
    this.setState(
      ({validation}) => ({
        validation: {
          ...validation,
          [field]: value
        }
      }),
      () => {
        if (onValidate) onValidate(isValid(this.state.validation))
      }
    )
  }

  onChangeField = (field, value, callback) => {
    const {onChange} = this.props
    const result = {
      ...this.state.value,
      [field]: value
    }
    this.setState({value: result}, callback)
    if (onChange) onChange(result, field)
  }

  onFocusField = (field) => this.setState({focus: field})

  onSubmit = () => {
    const {onSubmit} = this.props
    const {value} = this.state
    if (this.onValidate() && onSubmit) onSubmit(value)
  }

  get isValid() {
    return this.state.valid
  }

  get value() {
    return {
      ..._.omit(['fields'])(this.state),
      onSubscribe: this.onSubscribe,
      onUnsubscribe: this.onUnsubscribe,
      onFocusField: this.onFocusField,
      onChangeField: this.onChangeField,
      onValidateField: this.onValidateField,
      onValidate: this.onValidate,
      onSubmit: this.props.onSubmit && this.onSubmit
    }
  }

  render() {
    const {children} = this.props
    return <Provider value={this.value}>{children}</Provider>
  }
}

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
  value,
  ...props
}) => (
  <FormProvider
    onChange={onChange}
    onValidate={onValidate}
    onSubmit={onSubmit}
    value={value}
  >
    <Consumer>{(ctx) => <Target {...props} {...ctx} />}</Consumer>
  </FormProvider>
)

export default class FormProvider extends PureComponent {
  static defaultProps = {
    value: {}
  }

  state = {
    valid: true,
    value: {},
    fields: {},
    validation: {}
  }

  constructor(props) {
    super(props)
    if (props.defaultValue) this.state.value = props.defaultValue
  }

  static getDerivedStateFromProps({value}, state) {
    if (value && !_.isEqual(value, state.value)) return {value, valid: false}
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
      (valid, field) => valid && field.onValidate(),
      true
    )
    this.setState({valid})
    return valid
  }

  onValidateField = (field, value) => {
    const {onValidate} = this.props
    const result = {
      ...this.state.validation,
      [field]: value
    }
    const valid = isValid(result)
    this.setState({validation: result, valid})
    if (onValidate) onValidate(valid)
  }

  onChangeField = (field, value) => {
    const {onChange} = this.props
    const result = {
      ...this.state.value,
      [field]: value
    }
    this.setState({value: result})
    if (onChange) onChange(result)
  }

  onSubmit = () => {
    const {onSubmit} = this.props
    const {value} = this.state
    if (onSubmit) onSubmit(value)
  }

  get value() {
    return {
      ..._.omit(['fields'])(this.state),
      onSubscribe: this.onSubscribe,
      onUnsubscribe: this.onUnsubscribe,
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

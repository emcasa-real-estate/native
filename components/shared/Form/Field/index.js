import _ from 'lodash/fp'
import React from 'react'
import {PureComponent} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import {field as baseField} from './Provider'
import styles from './styles'

@baseField
export default class FieldView extends PureComponent {
  renderInput() {
    const {children, onValidate, ...props} = this.props
    return React.cloneElement(React.Children.only(children), {
      ...props,
      onValidate,
      onBlur: onValidate
    })
  }

  render() {
    const {valid, errors} = this.props

    return (
      <View style={styles.container}>
        {this.renderInput()}
        {!valid &&
          errors.map((message, i) => (
            <Text key={i} style={styles.error}>
              {message}
            </Text>
          ))}
      </View>
    )
  }
}

const mergeValidations = _.flow(
  (a = [], b = []) => b.concat(a),
  _.filter(_.identity),
  _.uniqBy((fun) => fun._name || fun.name || _.uniqueId())
)

export const field = (options = {}) => (Target) => (props) => (
  <FieldView
    {...props}
    {...options}
    validations={mergeValidations(options.validations, props.validations)}
  >
    <Target {...props} />
  </FieldView>
)

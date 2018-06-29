import _ from 'lodash/fp'
import {StyleSheet} from 'react-native'

import flatten from './flatten'
import nestedStyleSheet from './nestedStyleSheet'

export default _.flow(
  flatten,
  ({styles, ...props}) => ({
    styles: StyleSheet.create(styles),
    ...props
  }),
  nestedStyleSheet
)

import {Fragment} from 'react'

import Text from '@/components/shared/Text'
import styles from './styles'

export default ({children}) => (
  <Fragment>
    <Text style={styles.labelText}>{children}</Text>
    <Text style={[styles.labelText, styles.labelSuffix]}>m²</Text>
  </Fragment>
)

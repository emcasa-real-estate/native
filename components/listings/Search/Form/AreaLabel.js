import {Fragment} from 'react'

import Text from '@/components/shared/Text'
import Label from './Label'
import styles from './styles'

const AreaLabel = ({children}) => (
  <Fragment>
    <Text style={styles.labelText}>{children}</Text>
    <Text style={[styles.labelText, styles.labelSuffix]}>m²</Text>
  </Fragment>
)

export default (props) => <Label component={AreaLabel} {...props} />

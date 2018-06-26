import {Fragment} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import * as format from '@/assets/format'
import $styles from './styles'

function Price({styles, abbrev, children, nullable, size, ...props}) {
  const currencyStyle = $styles.all(
    {fontSize: size / 1.6},
    styles.currency,
    styles.text
  )
  const amountStyle = $styles.all({fontSize: size}, styles.amount, styles.text)
  const formatPrice = abbrev ? format.abbrevPrice : format.number
  return (
    <View style={styles.container} {...props}>
      {nullable && !children ? (
        <Text style={styles.amount}>{String.fromCharCode(0x2500)}</Text>
      ) : (
        <Fragment>
          <Text style={currencyStyle}>R$</Text>
          <Text style={amountStyle}>{formatPrice(children)}</Text>
        </Fragment>
      )}
    </View>
  )
}

Price.defaultProps = {
  size: 15
}

export default $styles.inject()(Price)

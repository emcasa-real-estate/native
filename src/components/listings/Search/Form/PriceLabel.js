import Price from '@/components/shared/Price'
import Label from './Label'
import styles from './styles'

const PriceLabel = ({children}) => (
  <Price abbrev styles={{text: styles.labelText}}>
    {children}
  </Price>
)

export default (props) => <Label component={PriceLabel} {...props} />

import Price from '@/components/shared/Price'
import styles from './styles'

export default (props) => (
  <Price abbrev styles={{text: styles.labelText}} {...props} />
)

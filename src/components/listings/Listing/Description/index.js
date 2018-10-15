import {View} from 'react-native'

import Text from '@/components/shared/Text'
import Price from '@/components/shared/Price'
import styles from './styles'

const Section = ({children, title, nested}) => (
  <View style={[styles.section, nested && styles.subSection]}>
    <Text style={styles.title}>{title.toUpperCase()}</Text>
    {children}
  </View>
)

export default function ListingDescription(props) {
  const {maintenanceFee, propertyTax} = props
  return (
    <View style={styles.container}>
      <Section title="O Imóvel">
        <Text style={styles.text}>{props.description}</Text>
      </Section>
      <View style={styles.listingId}>
        <Text style={styles.listingIdText}>Cód. imóvel {props.id}</Text>
      </View>
      <Section title="Tipo do Imóvel">
        <Text style={styles.text}>{props.type}</Text>
      </Section>
      {Boolean(maintenanceFee || propertyTax) && (
        <View style={styles.sectionContainer}>
          <Section nested title="Condomínio">
            <Price nullable>{maintenanceFee}</Price>
          </Section>
          <Section nested title="IPTU">
            <Price nullable>{propertyTax}</Price>
          </Section>
        </View>
      )}
    </View>
  )
}

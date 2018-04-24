import {Fragment} from 'react'
import {View} from 'react-native'

import Text from '@/components/shared/Text'
import styles from './styles'

export default function ListingsFeedEmpty({loading, online}) {
  if (loading) return null
  return (
    <View style={styles.container}>
      {online ? (
        <Fragment>
          <Text style={[styles.text, styles.header]}>Sem resultados</Text>
          <Text style={styles.text}>
            Altere ou limpe os filtros para ver resultados.
          </Text>
        </Fragment>
      ) : (
        <Fragment>
          <Text style={[styles.text, styles.header]}>Você está offline</Text>
          <Text style={styles.text}>Não foi possível carregar resultados.</Text>
        </Fragment>
      )}
    </View>
  )
}

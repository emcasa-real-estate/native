import {ScrollView, View} from 'react-native'
import {GatewayProvider} from 'react-gateway'

import GatewayView from '@/components/shared/GatewayView'
import $styles from './styles'

function Shell({styles, children, scroll}) {
  const Main = scroll ? ScrollView : View
  return (
    <GatewayProvider>
      <View testID="@shared.Shell" style={styles.container}>
        <View testID="@shared.Shell.Header">
          <GatewayView name="header" style={styles.header} />
        </View>
        <Main style={styles.main}>{children}</Main>
        <GatewayView name="footer" style={styles.footer} />
      </View>
    </GatewayProvider>
  )
}

export default $styles.inject()(Shell)

export {default as Navigation} from './Navigation'
export {default as Footer} from './Footer'
export {default as Header} from './Header'
export {default as Section} from './Section'

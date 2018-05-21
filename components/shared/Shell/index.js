import {View, Platform} from 'react-native'
import {GatewayProvider} from 'react-gateway'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import GatewayView from '@/components/shared/GatewayView'
import $styles from './styles'

function Shell({styles, children, scroll}) {
  const Main = scroll ? KeyboardAwareScrollView : View
  return (
    <GatewayProvider>
      <View style={styles.container}>
        <GatewayView name="header" style={styles.header} />
        <Main
          extraHeight={0}
          extraScrollHeight={-50}
          enableResetScrollToCoords={false}
          style={styles.main}
        >
          {children}
        </Main>
        <GatewayView name="footer" style={styles.footer} />
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </GatewayProvider>
  )
}

export default $styles.inject()(Shell)

export {default as Navigation} from './Navigation'
export {default as Footer} from './Footer'
export {default as Header} from './Header'
export {default as Section} from './Section'

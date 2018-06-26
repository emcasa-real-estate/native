import {WebView, View, Platform} from 'react-native'

import styles from './styles'

const hasWebglSupport = Platform.OS === 'ios' || Platform.Version >= 19 // >= Android 4.4 kitkat

export default function Matterport({children, code, play, width, height}) {
  let uri = `https://my.matterport.com/show?play=0&m=${code}`
  if (play) uri += '&play=1'
  const display = {width, height}
  return (
    <View style={[styles.container, display]}>
      {code &&
        hasWebglSupport && (
          <View style={[styles.content, display]}>
            <WebView source={{uri}} style={[styles.webview, display]} />
          </View>
        )}
      <View style={[styles.fallback, display]}>{children}</View>
    </View>
  )
}

Matterport.defaultProps = {
  play: false,
  width: '100%',
  height: '100%'
}

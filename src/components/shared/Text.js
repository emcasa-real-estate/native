import {Platform, Text} from 'react-native'

const baseStyle = {
  fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans'
}

export default function AppText({style, ...props}) {
  return <Text style={[baseStyle].concat(style)} {...props} />
}

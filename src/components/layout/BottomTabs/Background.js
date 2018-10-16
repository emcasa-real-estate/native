import styled from 'styled-components'
import {Dimensions, Image} from 'react-native'
import {themeGet, left, right} from 'styled-system'

const bgWidth = ({theme}) =>
  (Dimensions.get('window').width - theme.size.bottomTabsBg.width) / 2

const Background = styled((props) => (
  <Image {...props} source={require('@/assets/img/bg-bottom-bar.png')} />
))`
  z-index: 1;
  position: absolute;
  resize-mode: stretch;
  top: 0;
  height: ${themeGet('size.bottomTabsBg.height')};
  width: ${bgWidth};
  ${left};
  ${right};
`

export default Background

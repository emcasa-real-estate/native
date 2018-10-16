import styled from 'styled-components'
import {Dimensions, View, Image} from 'react-native'
import {themeGet, left, right} from 'styled-system'

const bgWidth = ({theme}) =>
  (Dimensions.get('window').width - theme.size.bottomTabsBg.width) / 2

const bgColorHeight = ({theme}) =>
  theme.size.bottomTabs - theme.size.bottomTabsBg.height

export const BackgroundImage = styled((props) => (
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

export const BackgroundColor = styled.View`
  z-index: 1;
  position: absolute;
  height: ${bgColorHeight};
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
`

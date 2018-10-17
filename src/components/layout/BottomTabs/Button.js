import {Fragment} from 'react'
import {View} from 'react-native'
import styled, {withTheme} from 'styled-components/native'
import {themeGet} from 'styled-system'
import {top, bottom, zIndex} from 'styled-system'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from '@emcasa/ui-native'

import {touchable} from '@/components/shared/Touchable'

const SIZE = 60

const Overlay = styled.View`
  position: absolute;
  left: 50%;
  margin-left: ${({theme}) => -(theme.size.bottomTabsBg.width / 2)};
  width: ${themeGet('size.bottomTabsBg.width')}
  height: ${themeGet('size.bottomTabs')};
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  ${zIndex};
  ${top};
  ${bottom};
`

Overlay.defaultProps = {
  zIndex: 0
}

const ButtonIcon = styled(Icon)`
  transform: rotate(45deg);
`

const Button = styled(function Button({icon, type, active, ...props}) {
  let colors = ['#FB0090', '#F50057']
  if (active) colors[1] = colors[0]
  return (
    <LinearGradient colors={colors} {...props}>
      <ButtonIcon
        name={icon}
        type={type}
        color="white"
        stroke="white"
        strokeWidth={10}
      />
    </LinearGradient>
  )
})`
  justify-content: center;
  align-items: center;
  width: ${SIZE};
  height: ${SIZE};
  border-radius: 20;
  transform: rotate(-45deg);
`

export default touchable(Button)

const BackgroundImage = styled.Image`
  resize-mode: stretch;
  width: ${themeGet('size.bottomTabsBg.width')};
  height: ${themeGet('size.bottomTabsBg.height')};
`

/**
 *  Tab bar center button wrapper
 */
export const ButtonContainer = ({children}) => (
  <Fragment>
    <Overlay zIndex={3} bottom={30} pointerEvents="box-none">
      {children}
    </Overlay>
    <Overlay zIndex={1} top={0} pointerEvents="none">
      <BackgroundImage
        source={require('@/assets/img/bg-bottom-bar-floating-bt.png')}
      />
    </Overlay>
  </Fragment>
)

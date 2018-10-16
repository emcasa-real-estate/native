import {Fragment} from 'react'
import {Image, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {top, bottom, zIndex} from 'styled-system'
import {Icon} from '@emcasa/ui-native'

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

const Button = styled(function Button({icon, type, ...props}) {
  return (
    <TouchableOpacity {...props}>
      <ButtonIcon
        name={icon}
        type={type}
        color="white"
        stroke="white"
        strokeWidth={10}
      />
    </TouchableOpacity>
  )
})`
  justify-content: center;
  align-items: center;
  width: ${SIZE};
  height: ${SIZE};
  background-color: ${themeGet('colors.pink')};
  border-radius: 20;
  transform: rotate(-45deg);
`

export default Button

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

import {PureComponent} from 'react'
import styled from 'styled-components'
import {themeGet, zIndex} from 'styled-system'
import {Animated, Easing, Dimensions, TouchableOpacity} from 'react-native'
import {View, Icon} from '@emcasa/ui-native'
import {compose} from 'recompose'

import {animate, withAnimation} from '@/components/shared/Animation'
import City from './City'

const Body = styled.View`
  position: absolute;
  bottom: ${themeGet('size.bottomTabs')};
  width: 100%;
  margin-horizontal: 30px;
  margin-bottom: 45px;
  padding: 30px;
  border-radius: 25px;
  background-color: rgba(60, 72, 88, 0.9);
`

const Background = compose(
  withAnimation({
    useNativeDriver: true,
    easing: Easing.inOut(Easing.cubic),
    timeout: 800
  }),
  animate((value) => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').height, 0]
        })
      }
    ]
  }))
)(styled(Animated.View)`
  top: 0;
  flex: 1;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
`)

const Overlay = styled(View)`
  ${zIndex};
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const CloseButton = styled((props) => (
  <TouchableOpacity {...props}>
    <Icon name="times" type="light" size={18} color="white" />
  </TouchableOpacity>
))`
  position: absolute;
  top: 15;
  right: 15;
`

export default class LocationSearch extends PureComponent {
  state = {
    activeView: City,
    visible: false,
    value: {}
  }

  onStart = () => this.setState({visible: true})

  onEnd = () => this.setState({visible: false})

  render() {
    const {zIndex, onDismiss} = this.props
    const {activeView: Component} = this.state
    return (
      <Overlay
        zIndex={zIndex}
        pointerEvents={this.state.visible ? 'auto' : 'none'}
      >
        <Background
          in={this.props.visible}
          onEnterStart={this.onStart}
          onLeaveEnd={this.onEnd}
        >
          {this.state.visible && (
            <Body>
              <CloseButton onPress={onDismiss} />
              <Component />
            </Body>
          )}
        </Background>
      </Overlay>
    )
  }
}

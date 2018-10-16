import styled from 'styled-components/native'
import {View} from 'react-native'
import {Icon} from '@emcasa/ui-native'

const ButtonIcon = styled(Icon)`
  transform: rotateX(45deg);
`

export default styled(({icon, type, ...props}) => (
  <View {...props}>
    <ButtonIcon name={icon} type={type} />
  </View>
))`
  transform: rotateX(-45deg);
`

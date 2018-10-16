import {View} from 'react-native'
import styled from 'styled-components/native'

import Button from './Button'
import Option from './Option'

const BottomTabs = styled(({jwt, children, onChange, ...props}) => (
  <View testID="bottom_tabs" {...props}>
    <Option icon="search" type="solid" onPress={() => onChange(0)}>
      Explorar
    </Option>
    <Option icon="flag" type="solid" onPress={() => onChange(1)}>
      Anunciar
    </Option>
    {children}
    <Option icon="heart" type="solid" onPress={() => onChange(2)}>
      Favoritos
    </Option>
    <Option icon="user" type="solid" onPress={() => onChange(3)}>
      {jwt ? 'Meu Perfil' : 'Login'}
    </Option>
  </View>
))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

BottomTabs.Button = Button

export default BottomTabs

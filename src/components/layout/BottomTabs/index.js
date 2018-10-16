import {View} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'

import {switchTab} from '@/screens/modules/navigation'
import {getCurrentTabIndex} from '@/screens/modules/navigation/selectors'
import {withJwt} from '@/graphql/containers/CredentialsQuery'
import Button from './Button'
import Option from './Option'
import {compose} from 'recompose'

const BottomTabs = styled(({jwt, children, tabIndex, onChange, ...props}) => (
  <View testID="bottom_tabs" {...props}>
    <Option
      icon="search"
      type="solid"
      active={tabIndex == 0}
      onPress={() => onChange(0)}
    >
      Explorar
    </Option>
    <Option
      icon="flag"
      type="solid"
      active={tabIndex == 1}
      onPress={() => onChange(1)}
    >
      Anunciar
    </Option>
    {children}
    <Option
      icon="heart"
      type="solid"
      active={tabIndex == 2}
      onPress={() => onChange(2)}
    >
      Favoritos
    </Option>
    <Option
      icon="user"
      type="solid"
      active={tabIndex == 3}
      onPress={() => onChange(3)}
    >
      {jwt ? 'Meu Perfil' : 'Login'}
    </Option>
  </View>
))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const BottomTabsContainer = compose(
  withJwt,
  connect(
    (state) => ({tabIndex: getCurrentTabIndex(state)}),
    {onChange: switchTab}
  )
)(BottomTabs)

BottomTabsContainer.Button = Button

export default BottomTabsContainer

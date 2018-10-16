import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {connect} from 'react-redux'
import {View} from '@emcasa/ui-native'

import getBottomTabs from '@/config/tabs'
import {switchTab} from '@/screens/modules/navigation'
import {getCurrentTabIndex} from '@/screens/modules/navigation/selectors'
import {withUserProfile} from '@/graphql/containers'
import Button, {ButtonContainer} from './Button'
import Tabs from './Tabs'
import Background from './Background'
import {compose} from 'recompose'

const BaseBottomTabs = styled(function BottomTabs({
  children,
  tabs,
  tabIndex,
  onChange,
  ...props
}) {
  const hasChildren = Boolean(children)
  return (
    <View {...props}>
      {hasChildren && <ButtonContainer>{children}</ButtonContainer>}
      <Tabs
        tabs={tabs}
        tabIndex={tabIndex}
        hasChildren={hasChildren}
        onChange={onChange}
      />
      <Background left={0} />
      <Background right={0} />
    </View>
  )
})`
  position: relative;
  height: ${themeGet('size.bottomTabs')};
`

const BottomTabs = compose(
  withUserProfile,
  connect(
    (state, {user}) => ({
      tabs: getBottomTabs(state, {user: user || {}}),
      tabIndex: getCurrentTabIndex(state)
    }),
    {onChange: switchTab}
  )
)(BaseBottomTabs)

BottomTabs.Button = Button

export default BottomTabs

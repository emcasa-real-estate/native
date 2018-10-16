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
import {BackgroundImage, BackgroundColor} from './Background'
import {compose} from 'recompose'

const BaseBottomTabs = styled(function BottomTabs({
  tabs,
  tabIndex,
  onChange,
  icon,
  type,
  onPress,
  ...props
}) {
  const hasChildren = Boolean(icon)
  return (
    <View {...props}>
      {hasChildren && (
        <ButtonContainer>
          <Button icon={icon} type={type} onPress={onPress} />
        </ButtonContainer>
      )}
      <Tabs
        tabs={tabs}
        tabIndex={tabIndex}
        hasChildren={hasChildren}
        onChange={onChange}
      />
      <BackgroundImage left={0} />
      <BackgroundImage right={0} />
      <BackgroundColor />
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

export default BottomTabs

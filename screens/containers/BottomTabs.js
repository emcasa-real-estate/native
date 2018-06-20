import {PureComponent} from 'react'
import {connect} from 'react-redux'

import {switchTab} from '@/screens/module/navigation'
import {
  getNavigationStack,
  getCurrentTab
} from '@/screens/module/navigation/selectors'
import BottomTabs from '@/components/layout/Navigation'

@connect(
  (state) => ({
    currentTab: getCurrentTab(state),
    stack: getNavigationStack(state)
  }),
  {switchTab}
)
export default class BottomTabsApp extends PureComponent {
  render() {
    const {stack, currentTab} = this.props
    const {switchTab} = this.props
    return (
      <BottomTabs
        stack={stack}
        currentTab={currentTab}
        onNavigate={(tab) => switchTab(tab)}
      />
    )
  }
}

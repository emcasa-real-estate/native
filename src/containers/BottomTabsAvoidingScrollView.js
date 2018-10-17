import React from 'react'
import {withTheme} from 'styled-components'

function BottomTabsAvoidingScrollView({
  theme,
  children,
  contentInset,
  scrollIndicatorInsets,
  ...props
}) {
  props.scrollIndicatorInsets = {
    ...scrollIndicatorInsets,
    bottom: theme.size.bottomTabs
  }
  props.contentInset = {
    ...contentInset,
    bottom: theme.size.bottomTabs
  }
  if (typeof children === 'function') return children(props)
  return React.cloneElement(React.Children.only(children), props)
}

BottomTabsAvoidingScrollView.defaultProps = {
  scrollIndicatorInsets: {top: 0, bottom: 0, left: 0, right: 0},
  contentInset: {top: 0, bottom: 0, left: 0, right: 0}
}

export default withTheme(BottomTabsAvoidingScrollView)

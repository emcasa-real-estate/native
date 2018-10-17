import React from 'react'
import {withTheme} from 'styled-components'

function BottomTabsAvoidingScrollView({
  theme,
  children,
  contentInset,
  scrollIndicatorInsets
}) {
  const nextProps = {
    scrollIndicatorInsets: {
      ...scrollIndicatorInsets,
      bottom: theme.size.bottomTabs
    },
    contentInset: {
      ...contentInset,
      bottom: 10
    }
  }
  if (typeof children === 'function') return children(nextProps)
  return React.cloneElement(React.Children.only(children), nextProps)
}

BottomTabsAvoidingScrollView.defaultProps = {
  scrollIndicatorInsets: {top: 0, bottom: 0, left: 0, right: 0},
  contentInset: {top: 0, bottom: 0, left: 0, right: 0}
}

export default withTheme(BottomTabsAvoidingScrollView)

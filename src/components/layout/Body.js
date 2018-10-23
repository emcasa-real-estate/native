import {PureComponent} from 'react'
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native'

import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'
import * as colors from '@/assets/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff20'
  },
  statusBar: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  body: {
    flex: 1,
    zIndex: 0
  }
})

export default class Body extends PureComponent {
  state = {
    children: undefined,
    layout: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 50
    }
  }

  static getDerivedStateFromProps({children, loading}) {
    if (!loading) return {children}
    return null
  }

  renderOverlay() {
    const {children, layout} = this.state
    return (
      <View style={[layout, children ? styles.statusBar : styles.overlay]}>
        <ActivityIndicator
          size={children ? 'small' : 'large'}
          color={colors.blue.medium}
        />
      </View>
    )
  }

  render() {
    const {style, scroll, loading, testID, hasBottomTabs, ...props} = this.props
    const {children} = this.state
    const ViewComponent = scroll ? ScrollView : View

    const component = (
      <ViewComponent
        automaticallyAdjustContentInsets={false}
        testID={testID}
        style={[styles.container, style]}
        {...props}
      >
        {loading && this.renderOverlay()}
        <View style={styles.body}>{children}</View>
      </ViewComponent>
    )
    if (!(scroll && hasBottomTabs)) return component
    return (
      <BottomTabsAvoidingScrollView>{component}</BottomTabsAvoidingScrollView>
    )
  }
}

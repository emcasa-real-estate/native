import {Component} from 'react'
import {WebView, View, ActivityIndicator, StyleSheet} from 'react-native'

const URL = 'https://calendly.com/em-casa'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  }
})

export default class Calendly extends Component {
  state = {
    loading: false
  }

  onLoad = (loading) => () => this.setState({loading})

  render() {
    const {loading} = this.state

    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
        <WebView
          source={{uri: URL}}
          style={StyleSheet.absoluteFill}
          onLoadStart={this.onLoad(true)}
          onLoadEnd={this.onLoad(false)}
        />
      </View>
    )
  }
}

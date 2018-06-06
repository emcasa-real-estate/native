import {PureComponent} from 'react'
import {View, ActivityIndicator} from 'react-native'

export default class GalleryProgress extends PureComponent {
  render() {
    const {progress, loading} = this.props
    if (!loading) return null
    return (
      <View>
        <View style={{width: progress[0] / progress[1] * 100 + '%'}} />
      </View>
    )
  }
}

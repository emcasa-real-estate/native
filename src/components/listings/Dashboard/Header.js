import {PureComponent} from 'react'
import {View, Dimensions} from 'react-native'

import Text from '@/components/shared/Text'
import Image from '@/components/listings/Image'
import styles from './styles'

export default class ListingDashboardHeader extends PureComponent {
  state = {
    layout: {
      width: Dimensions.get('window').width - 40
    }
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})
  render() {
    const {id, images, address} = this.props
    const {layout} = this.state
    const image = images[0] || {}

    return (
      <View style={styles.headerContainer}>
        <View style={styles.header} onLayout={this.onLayout}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              width={layout.width / 2}
              height={Math.max(layout.width / 2 * 0.6, 100)}
              {...image}
            />
          </View>
          <View style={styles.description}>
            <Text style={styles.h1}>{address.street}</Text>
            <Text style={styles.h2}>{address.neighborhood.toUpperCase()}</Text>
            <Text style={styles.h2}>ID #{id}</Text>
          </View>
        </View>
      </View>
    )
  }
}

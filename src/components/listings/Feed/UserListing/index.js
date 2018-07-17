import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card/UserListing'
import {PureComponent} from 'react'

const keyExtractor = _.flow(_.get('id'), _.toString)

export default class UserListingFeed extends PureComponent {
  static defaultProps = {
    Card
  }

  onEdit = (id) => () => this.props.onEdit(id)

  onViewStats = (id) => () => this.props.onViewStats(id)

  onViewListing = (id) => () => this.props.onViewListing(id)

  renderCard = ({item, index}) => {
    return (
      <Card
        testUniqueID={index + 1}
        onEdit={this.onEdit(item.id)}
        onViewStats={this.onViewStats(item.id)}
        onViewListing={this.onViewListing(item.id)}
        {...item}
      />
    )
  }

  render() {
    return (
      <FlatList
        {...this.props}
        testID="user_listing_feed"
        contentContainerStyle={{paddingVertical: 15}}
        keyExtractor={keyExtractor}
        renderItem={this.renderCard}
      />
    )
  }
}

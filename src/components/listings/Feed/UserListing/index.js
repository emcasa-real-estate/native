import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card/UserListing'
import {PureComponent} from 'react'

const keyExtractor = _.flow(_.get('id'), _.toString)

export default class UserListingFeed extends PureComponent {
  static defaultProps = {
    Card
  }

  state = {active: undefined}

  onSelect = (id) => () =>
    this.setState((state) => ({
      active: id == state.active ? undefined : id,
      onScroll: _.after(this.onDeselect)(10)
    }))

  onDeselect = () =>
    this.setState({
      active: undefined,
      onScroll: undefined
    })

  onEdit = (id) => () => this.props.onEdit(id)

  onViewStats = (id) => () => this.props.onViewStats(id)

  onViewListing = (id) => () => this.props.onViewListing(id)

  renderCard = ({item, index}) => {
    const isActive = this.state.active == item.id
    return (
      <Card
        testUniqueID={index + 1}
        active={isActive}
        onPress={this.onSelect(item.id)}
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
        onScroll={this.state.onScroll}
        scrollEventThrottle={100}
        activeListingId={this.state.active} // Update children when active id changes
        testID="listing_feed"
        keyExtractor={keyExtractor}
        renderItem={this.renderCard}
      />
    )
  }
}

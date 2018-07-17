import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card/UserListing'
import {PureComponent} from 'react'

const keyExtractor = _.flow(_.get('id'), _.toString)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default function UserListingFeed({
  Card,
  onViewListing,
  onViewStats,
  onEdit,
  ...props
}) {
  return (
    <FlatList
      {...props}
      testID="user_listing_feed"
      keyExtractor={keyExtractor}
      removeClippedSubviews={process.env.NODE_ENV === 'production'}
      renderItem={({item, index}) => (
        <Card
          style={index == 0 ? {marginTop: 15} : undefined}
          testUniqueID={index + 1}
          onViewListing={createHandler(onViewListing, item.id)}
          onViewStats={createHandler(onViewStats, item.id)}
          onEdit={createHandler(onEdit, item.id)}
          {...item}
        />
      )}
    />
  )
}

UserListingFeed.defaultProps = {
  Card
}

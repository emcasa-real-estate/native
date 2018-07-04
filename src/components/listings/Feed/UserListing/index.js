import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card/UserListing'

const keyExtractor = _.flow(_.get('id'), _.toString)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default function UserListingFeed({
  onEdit,
  onViewStats,
  onViewListing,
  pagination,
  Card,
  ...props
}) {
  return (
    <FlatList
      {...props}
      testID="listing_feed"
      pagination={pagination}
      keyExtractor={keyExtractor}
      renderItem={({item, index}) => (
        <Card
          testUniqueID={index + 1}
          onEdit={createHandler(onEdit, item.id)}
          onViewStats={createHandler(onViewStats, item.id)}
          onViewListing={createHandler(onViewListing, item.id)}
          {...item}
        />
      )}
    />
  )
}

UserListingFeed.defaultProps = {
  Card
}

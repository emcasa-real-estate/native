import _ from 'lodash/fp'
import {FlatList} from 'react-native'

import Card from '@/components/listings/Card/Listing'

const keyExtractor = _.flow(_.get('id'), _.toString)

const createHandler = (fun, ...args) => fun && (() => fun(...args))

export default function ListingFeed({onSelect, pagination, Card, ...props}) {
  return (
    <FlatList
      {...props}
      testID="@listings.Feed.Listing"
      pagination={pagination}
      keyExtractor={keyExtractor}
      renderItem={({item, index}) => (
        <Card
          testUniqueID={index + 1}
          onPress={createHandler(onSelect, item.id)}
          {...item}
        />
      )}
    />
  )
}

ListingFeed.defaultProps = {
  Card
}

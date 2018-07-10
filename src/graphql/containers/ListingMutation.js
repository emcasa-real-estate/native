import {Mutation} from 'react-apollo'

import {
  INSERT_LISTING,
  UPDATE_LISTING
} from '@/graphql/modules/listings/mutations'

export default function ListingMutation({children, id}) {
  return (
    <Mutation mutation={id ? UPDATE_LISTING : INSERT_LISTING}>
      {(mutate, props) =>
        children(
          ({variables}) => mutate({variables: {id, ...variables}}),
          props
        )
      }
    </Mutation>
  )
}

export const withListingMutation = (getOptions) => (Target) => (props) => (
  <ListingMutation {...(getOptions ? getOptions(props) : {})}>
    {(mutation, ctx) => <Target submitListing={mutation} {...props} {...ctx} />}
  </ListingMutation>
)

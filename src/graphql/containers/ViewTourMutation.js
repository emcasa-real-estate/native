import {graphql} from 'react-apollo'

import {VISUALIZE_TOUR} from '@/graphql/modules/listings/mutations'

export const withViewTourMutation = graphql(VISUALIZE_TOUR, {
  options: ({id}) => ({
    variables: {id}
  }),
  props: ({mutate}) => ({
    viewTour: () => mutate()
  })
})

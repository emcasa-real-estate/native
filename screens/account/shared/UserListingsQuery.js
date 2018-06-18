import React, {PureComponent} from 'react'
import {Query} from 'react-apollo'
import hoistNonReactStatics from 'hoist-non-react-statics'

import {GET_USER_LISTINGS} from '@/graphql/modules/user/queries'

export const withUserListings = (Target) =>
  hoistNonReactStatics(
    class extends PureComponent {
      static displayName = `withUserListings(${Target.displayName ||
        Target.name})`

      instance = React.createRef()

      getWrappedInstance() {
        return this.instance.current
      }

      render() {
        return (
          <Query
            query={GET_USER_LISTINGS}
            fetchPolicy={
              process.env.NODE_ENV === 'e2e'
                ? 'cache-and-network'
                : 'network-only'
            }
          >
            {(response) => (
              <Target
                {...this.props}
                ref={this.instance}
                userListings={{
                  loading: response.loading,
                  data: response.data ? response.data.userListings : [],
                  refetch: response.refetch
                }}
              />
            )}
          </Query>
        )
      }
    },
    Target
  )

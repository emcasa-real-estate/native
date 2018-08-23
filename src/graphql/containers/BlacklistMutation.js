import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {BLACKLIST, WHITELIST} from '@/graphql/modules/listings/mutations'
import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {logEvent} from '@/redux/modules/firebase/analytics'
import {getToken} from '@/redux/modules/auth/selectors'
import {withBlacklistedListingByID} from './BlacklistQuery'

const BlacklistMutation = connect((state) => ({jwt: getToken(state)}), {
  logEvent
})(function _BlacklistMutation({children, id, blacklisted, jwt, logEvent}) {
  const query = {cache: !jwt}
  return (
    <Mutation
      mutation={blacklisted ? WHITELIST(query) : BLACKLIST(query)}
      variables={{id}}
      refetchQueries={[{query: GET_BLACKLISTED_LISTINGS_IDS(query)}]}
      update={() =>
        logEvent(blacklisted ? 'whitelisted_listing' : 'blacklisted_listing', {
          id
        })
      }
    >
      {children}
    </Mutation>
  )
})

export default BlacklistMutation

export const withBlacklistMutation = (Target) =>
  withBlacklistedListingByID((props) => (
    <BlacklistMutation {...props}>
      {(onBlacklist) => <Target {...props} onBlacklist={() => onBlacklist()} />}
    </BlacklistMutation>
  ))

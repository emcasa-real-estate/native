import {Navigation} from 'react-native-navigation'

import * as listingForm from '@/screens/modules/listingForm/screens'
import * as account from '@/screens/modules/account/screens'
import authenticated from './authenticated'

export const AuthTab = authenticated(account.Menu, {
  screenName: 'account',
  params: (_, {componentId}) => ({
    onLogin() {
      Navigation.mergeOptions(componentId, {
        bottomTabs: {
          currentTabIndex: 0
        }
      })
    }
  })
})
export const NewListingTab = authenticated(listingForm.Address, {
  screenName: 'newListing',
  params: {notice: 'O login é necessário para anunciar um imóvel.'}
})

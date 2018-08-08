import * as listingForm from '@/screens/modules/listingForm/screens'
import * as account from '@/screens/modules/account/screens'
import authenticated from './authenticated'

export const AuthTab = authenticated(account.Menu, {screenName: 'account'})
export const NewListingTab = authenticated(listingForm.Address, {
  screenName: 'newListing',
  params: {notice: 'O login é necessário para anunciar um imóvel.'}
})

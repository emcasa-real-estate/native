import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import * as frag from '@/graphql/fragments'
import composeWithRef from '@/lib/composeWithRef'
import withContext from '@/screens/modules/context/withContext'
import {
  withListingMutation,
  withProfileMutation,
  withListing
} from '@/graphql/containers'
import Button from '@/screens/modules/shared/Header/TextButton'

const compare = (value, source = {}) =>
  _.reduce(
    value,
    (result, val, key) =>
      result && (source[key] == val || (!source[key] && !val)),
    true
  )

const compareListings = ({address, ...value}, listing) => {
  return (
    compare(_.omit(value, ['images']), listing) &&
    compare(_.omit(address.details, ['lng', 'lat']), listing.address)
  )
}

class ListingFormSubmitButton extends PureComponent {
  static screenName = 'listingForm.SubmitButton'

  get hasChanges() {
    const {listing, value} = this.props
    return !listing.loading && value && !compareListings(value, listing.data)
  }

  validate() {
    const {onValidate} = this.props
    return onValidate
      ? onValidate() !== false
      : this.props.validAddress !== false && this.props.validListing !== false
  }

  onSubmit = async () => {
    const {
      value: {phone, address, ...listing},
      setContext,
      editUserProfile,
      submitListing
    } = this.props
    setContext({loading: true})
    try {
      if (phone) await editUserProfile({variables: {phone}})
      await submitListing({
        variables: {
          listing: frag.ListingInput.parseInput({
            ...listing,
            address: address.details
          })
        }
      })
      setContext({error: undefined, loading: false})
      return true
    } catch (error) {
      setContext({error, loading: false})
      return false
    }
  }

  onPress = async () => {
    const {params, loading} = this.props
    if (
      loading ||
      !this.validate() ||
      (this.hasChanges && !await this.onSubmit())
    )
      return
    Navigation.popTo(params.parentId)
  }

  render() {
    const {loading} = this.props

    return (
      <Button
        label="Salvar e sair"
        style={this.hasChanges ? undefined : {color: colors.gray.medium}}
        loading={loading}
        onPress={this.onPress}
      />
    )
  }
}

export default composeWithRef(
  withContext.byProp('params.contextId'),
  withProfileMutation,
  withListing(({params: {id}}) => ({id})),
  withListingMutation(({params: {id}}) => ({id}))
)(ListingFormSubmitButton)

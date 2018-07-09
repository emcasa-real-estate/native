import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import composeWithRef from '@/lib/composeWithRef'
import withContext from '@/screens/modules/context/withContext'
import {withListingMutation} from '@/graphql/containers'
import Button from '@/screens/modules/shared/Header/TextButton'

class ListingFormSubmitButton extends PureComponent {
  static screenName = 'listingForm.SubmitButton'

  get hasChanges() {
    return true
  }

  onPress = async () => {
    const {loading, submitListing, params} = this.props
    if (!loading && this.hasChanges) {
      // ...
    }
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
  withListingMutation(({params: {id}}) => ({id}))
)(ListingFormSubmitButton)

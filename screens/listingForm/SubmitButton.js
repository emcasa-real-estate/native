import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {submit} from './reducer'
import {isLoading} from './selectors'
import Button from '@/screens/shared/Header/TextButton'

class ListingFormSubmitButton extends PureComponent {
  static screenName = 'listingForm.SubmitButton'

  onPress = () => {
    this.props.submit()
  }

  render() {
    const {loading} = this.props

    return (
      <Button label="Salvar e sair" loading={loading} onPress={this.onPress} />
    )
  }
}

export default composeWithRef(
  connect((state) => ({loading: isLoading(state)}), {submit})
)(ListingFormSubmitButton)

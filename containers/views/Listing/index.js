import {Component} from 'react'
import {withNavigationFocus} from 'react-navigation'

import Shell, {Section, Footer} from '@/containers/shared/Shell'
import Listing, {Price} from '@/containers/listings/Listing'
import RelatedListings from '@/containers/listings/Feed/Related'

export default class ListingScreen extends Component {
  onInterest = () => {
    const {navigation} = this.props
    navigation.navigate('interestForm', navigation.state.params)
  }

  render() {
    const {navigation, isFocused} = this.props
    const {id} = navigation.state.params

    return (
      <Shell
        scroll
        title={<Price id={id} size={24} />}
        footer={
          <Footer
            color="green"
            label="Marcar Visita"
            onPress={this.onInterest}
          />
        }
      >
        <Listing active={isFocused} id={id} />
        <Section title="Veja Também">
          <RelatedListings id={id} />
        </Section>
      </Shell>
    )
  }
}

export const screen = withNavigationFocus(ListingScreen)

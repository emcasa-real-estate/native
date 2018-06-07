import {Component} from 'react'
import {connect} from 'react-redux'

import {getData, isLoading} from '@/redux/modules/listings/data/selectors'
import Shell, {Section, Footer} from '@/containers/shared/Shell'
import Listing, {Price} from '@/containers/listings/Listing'
import RelatedListings from '@/containers/listings/Feed/Related'

@connect((state, {navigation}) => ({
  data: getData(state, navigation.state.params) || {},
  loading: isLoading(state, navigation.state.params)
}))
export default class ListingScreen extends Component {
  onInterest = () => {
    const {navigation} = this.props
    navigation.navigate('interestForm', navigation.state.params)
  }

  render() {
    const {navigation, data, loading} = this.props
    const {id} = navigation.state.params

    return (
      <Shell
        scroll
        title={<Price nullable id={id} size={24} />}
        footer={
          !loading && data.isActive ? (
            <Footer
              color="green"
              label="Marcar Visita"
              onPress={this.onInterest}
            />
          ) : null
        }
      >
        <Listing id={id} />
        {!loading && (
          <Section title="Veja Também">
            <RelatedListings id={id} />
          </Section>
        )}
      </Shell>
    )
  }
}

export const screen = ListingScreen

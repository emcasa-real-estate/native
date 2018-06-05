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
  navigateTo = (screen) => () => {
    const {navigation} = this.props
    navigation.navigate(screen, navigation.state.params)
  }

  renderFooter() {
    const {navigation, loading} = this.props
    const {editing} = navigation.state.params
    if (loading) return null
    if (editing)
      return (
        <Footer
          color="green"
          label="Editar"
          onPress={this.navigateTo('gallery')}
        />
      )
    return (
      <Footer
        color="green"
        label="Marcar Visita"
        onPress={this.navigateTo('interestForm')}
      />
    )
  }

  render() {
    const {navigation, loading} = this.props
    const {id} = navigation.state.params

    return (
      <Shell
        scroll
        title={<Price nullable id={id} size={24} />}
        footer={this.renderFooter()}
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

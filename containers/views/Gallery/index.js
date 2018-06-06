import {Component} from 'react'
import {connect} from 'react-redux'

import {getProgress, getErrors} from '@/redux/modules/gallery/upload/selectors'
import {create} from '@/redux/modules/gallery/upload'
import Shell from '@/containers/shared/Shell'
import Gallery from '@/components/newListing/Gallery'

@connect(
  (state, {navigation: {state: {params}}}) => ({
    progress: getProgress(state, params),
    errors: getErrors(state, params)
  }),
  {create}
)
export default class GalleryScreen extends Component {
  onUpload = (images) => {
    const {create, navigation: {state: {params}}} = this.props
    create(params.id, images)
  }

  render() {
    return (
      <Shell title="Editar imagens" footer={null}>
        <Gallery {...this.props} onUpload={this.onUpload} />
      </Shell>
    )
  }
}

export const screen = GalleryScreen

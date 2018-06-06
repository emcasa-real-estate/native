import {Component} from 'react'
import {connect} from 'react-redux'

import {getImages} from '@/redux/modules/gallery/data/selectors'
import {request} from '@/redux/modules/gallery/data'
import {getProgress, getErrors} from '@/redux/modules/gallery/upload/selectors'
import {create} from '@/redux/modules/gallery/upload'
import Shell from '@/containers/shared/Shell'
import Gallery from '@/components/newListing/Gallery'

@connect(
  (state, {navigation: {state: {params}}}) => ({
    images: getImages(state, params) || [],
    progress: getProgress(state, params),
    errors: getErrors(state, params)
  }),
  {request, create}
)
export default class GalleryScreen extends Component {
  componentDidMount() {
    const {request, navigation: {state: {params}}} = this.props
    request(params.id)
  }

  onUpload = (images) => {
    const {create, navigation: {state: {params}}} = this.props
    create(params.id, images)
  }

  render() {
    const {progress, errors, images} = this.props
    return (
      <Shell scroll title="Editar imagens" footer={null}>
        <Gallery
          progress={progress}
          errors={errors}
          images={images}
          onUpload={this.onUpload}
        />
      </Shell>
    )
  }
}

export const screen = GalleryScreen

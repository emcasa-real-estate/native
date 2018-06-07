import {Component} from 'react'
import {connect} from 'react-redux'

import {getImages} from '@/redux/modules/gallery/data/selectors'
import {load, remove} from '@/redux/modules/gallery/data'
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
  {load, remove, create}
)
export default class GalleryScreen extends Component {
  componentDidMount() {
    const {load, navigation: {state: {params}}} = this.props
    load(params.id)
  }

  onUpload = (images) => {
    const {create, navigation: {state: {params}}} = this.props
    create(params.id, images)
  }

  onDeleteImage = (imageId) => {
    const {remove, navigation: {state: {params}}} = this.props
    remove(params.id, imageId)
  }

  render() {
    const {progress, errors, images} = this.props
    return (
      <Shell title="Editar imagens" footer={null}>
        <Gallery
          progress={progress}
          errors={errors}
          images={images}
          onUpload={this.onUpload}
          onDeleteImage={this.onDeleteImage}
        />
      </Shell>
    )
  }
}

export const screen = GalleryScreen

import _ from 'lodash'
import {Component} from 'react'
import {connect} from 'react-redux'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import {getImages} from '@/redux/modules/gallery/data/selectors'
import {load, remove, changeOrder} from '@/redux/modules/gallery/data'
import {
  getProgress,
  getErrors,
  isLoading
} from '@/redux/modules/gallery/upload/selectors'
import {create} from '@/redux/modules/gallery/upload'
import Shell, {LoadingView} from '@/containers/shared/Shell'
import Gallery from '@/components/newListing/Gallery'

@connect(
  (state, {navigation: {state: {params}}}) => ({
    images: getImages(state, params),
    loading: isLoading(state, params),
    progress: getProgress(state, params),
    errors: getErrors(state, params)
  }),
  {load, remove, create, changeOrder}
)
@withApollo
export default class GalleryScreen extends Component {
  componentDidMount() {
    const {load, navigation: {state: {params}}} = this.props
    load(params.id)
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.images, this.props.images)) this.updateApolloCache()
  }

  onUpload = (images) => {
    const {create, navigation: {state: {params}}} = this.props
    create(params.id, images)
  }

  onDeleteImage = (imageId) => {
    const {remove, navigation: {state: {params}}} = this.props
    remove(params.id, imageId)
  }

  onChangeOrder = (order) => {
    const {changeOrder, navigation: {state: {params}}} = this.props
    changeOrder(params.id, order)
  }

  updateApolloCache() {
    const {client, images, navigation: {state: {params}}} = this.props
    client.writeFragment({
      id: `Listing:${params.id}`,
      fragment: gql`
        fragment images on Listing {
          images {
            ... on Image {
              id
              filename
              position
              description
            }
          }
        }
      `,
      data: {
        __typename: 'Listing',
        images: images.map((data) => ({
          ...data,
          __typename: 'Image'
        }))
      }
    })
  }

  render() {
    const {progress, errors, loading, images} = this.props
    return (
      <Shell title="Editar imagens" footer={null}>
        {!images ? (
          <LoadingView />
        ) : (
          <Gallery
            progress={progress}
            errors={errors}
            images={images}
            loading={loading}
            onUpload={this.onUpload}
            onDeleteImage={this.onDeleteImage}
            onChangeOrder={this.onChangeOrder}
          />
        )}
      </Shell>
    )
  }
}

export const screen = GalleryScreen

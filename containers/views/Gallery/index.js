import {Component} from 'react'

import Shell from '@/containers/shared/Shell'
import Gallery from '@/components/newListing/Gallery'

export default class GalleryScreen extends Component {
  render() {
    return (
      <Shell title="Editar imagens" footer={null}>
        <Gallery onUpload={console.log} />
      </Shell>
    )
  }
}

export const screen = GalleryScreen

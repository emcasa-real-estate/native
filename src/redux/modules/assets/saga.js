import {fork} from 'redux-saga/effects'
import {Image} from 'react-native'

const images = [
  require('@/assets/img/bg-bottom-bar.png'),
  require('@/assets/img/bg-bottom-bar-floating-bt.png')
]

async function preloadImages() {
  await Promise.all(
    images.map((img) => Image.prefetch(Image.resolveAssetSource(img).uri))
  )
}

export default function* assetsSaga() {
  yield fork(preloadImages)
}

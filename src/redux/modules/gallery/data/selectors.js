import _ from 'lodash'
import {createSelector} from 'reselect'

export const getGalleries = (state) => state.gallery.data

export const getGalleryData = createSelector(
  getGalleries,
  (_, {id}) => id,
  (galleries, id) => galleries[id] || {}
)

export const getImages = createSelector(
  getGalleryData,
  (gallery) => (gallery.data ? _.sortBy(gallery.data, 'position') : undefined)
)

export const getError = createSelector(
  getGalleryData,
  (gallery) => gallery.error
)

export const isLoading = createSelector(getGalleryData, (gallery) =>
  Boolean(gallery.loading)
)

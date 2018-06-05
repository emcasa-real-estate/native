import {createSelector} from 'reselect'

export const getGalleryUploads = (state) => state.gallery.upload

export const getUpload = createSelector(
  getGalleryUploads,
  (_, {id}) => id,
  (uploads, id) => uploads[id] || {}
)

export const getProgress = createSelector(getUpload, (upload) => upload.data)

export const getErrors = createSelector(getUpload, (upload) => upload.error)

export const isLoading = createSelector(
  getUpload,
  (upload) => upload.progress && upload.progress[0] < upload.progress[1]
)

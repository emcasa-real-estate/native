import {CDN_UPLOAD_PRESET, CDN_UPLOAD_URL} from '@/lib/config'

export async function upload({uri, type, fileName}) {
  const data = new FormData()
  data.append('upload_preset', CDN_UPLOAD_PRESET)
  data.append('file', {
    uri,
    type,
    name: fileName
  })
  const response = await fetch(CDN_UPLOAD_URL, {
    method: 'POST',
    body: data
  })
  if (Math.floor(response.status / 100) !== 2) {
    throw new Error('Failed to upload image')
  }
  const {public_id, format} = await response.json()
  return `${public_id}.${format}`
}

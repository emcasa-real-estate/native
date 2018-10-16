import {CDN_UPLOAD_PRESET, CDN_UPLOAD_URL} from '@/config/const'

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
  if (!response.ok) {
    throw new Error('Failed to upload image')
  }
  const json = await response.json()
  return {
    filename: `${json.public_id}.${json.format}`
  }
}

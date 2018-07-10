import {Platform} from 'react-native'

export const CDN_URL =
  process.env.CDN_URL || 'https://res.cloudinary.com/emcasa/image/upload'

export const CDN_UPLOAD_PRESET =
  process.env.CDN_UPLOAD_PRESET || 'emcasa-staging'

export const CDN_UPLOAD_URL =
  process.env.CDN_UPLOAD_URL || 'https://api.cloudinary.com/v1_1/emcasa/upload'

export const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://staging.emcasa.com'

export const API_URL =
  Platform.select({
    ios: process.env.IOS_API_URL,
    android: process.env.ANDROID_API_URL
  }) ||
  process.env.API_URL ||
  'https://em-casa-backend-staging.herokuapp.com'

export const APOLLO_ENGINE_URL =
  Platform.select({
    ios: process.env.IOS_APOLLO_ENGINE_URL,
    android: process.env.ANDROID_APOLLO_ENGINE_URL
  }) ||
  process.env.APOLLO_ENGINE_URL ||
  `${API_URL}/graphql_api`

export const WEB_SOCKET_URL =
  Platform.select({
    ios: process.env.IOS_WEB_SOCKET_URL,
    android: process.env.ANDROID_WEB_SOCKET_URL
  }) ||
  process.env.WEB_SOCKET_URL ||
  `${API_URL.replace(/^http/, 'ws')}/socket`

export const MESSENGER_RECEIVER_ID = process.env.MESSENGER_RECEIVER_ID || '0'

export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

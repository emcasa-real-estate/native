import {Platform} from 'react-native'

export const CDN_URL =
  Platform.select({
    ios: process.env.IOS_CDN_URL,
    android: process.env.ANDROID_CDN_URL
  }) ||
  process.env.CDN_URL ||
  'https://res.cloudinary.com/emcasa/image/upload'

export const API_URL =
  Platform.select({
    ios: process.env.IOS_API_URL,
    android: process.env.ANDROID_API_URL
  }) ||
  process.env.API_URL ||
  'https://em-casa-backend-staging.herokuapp.com'

export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

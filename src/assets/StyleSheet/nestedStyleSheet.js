import _ from 'lodash/fp'
import combine from './combine'
import inject from './hoc'
import {styleId} from './flatten'

export default function createStyleSheet(flat) {
  const styleSheet = _.flow(
    _.pickBy(_.identity),
    _.pick(flat.variants),
    (variantsToApply) => {
      const result = {}
      flat.namespaces.forEach((namespace) => {
        result[namespace] = styleSheet.get(namespace, variantsToApply)
      })
      return result
    }
  )
  styleSheet.get = (namespace, variantsToApply = {}) => {
    const result = [flat.styles[namespace]]
    for (const key of _.keys(variantsToApply)) {
      const value = variantsToApply[key]
      if (!value) continue
      result.push(flat.styles[styleId(namespace, key)])
      if (typeof value === 'string')
        result.push(flat.styles[styleId(namespace, key, value)])
    }
    return _.compact(result)
  }
  styleSheet._flat = flat
  styleSheet.inject = inject(styleSheet)
  styleSheet.all = combine(styleSheet)
  return Object.assign(styleSheet, flat.styles)
}

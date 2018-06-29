import _ from 'lodash'

function parseSelector(str) {
  const [key, value] = str.split('=', 2)
  return {key, value}
}

export function styleId(namespace, selector, value) {
  return `${namespace}__${selector}_${value || ''}`
}

export default function flatten(styles) {
  const result = {}
  const variants = []
  const namespaces = []
  _.map(styles, (style, namespace) => {
    result[namespace] = {}
    namespaces.push(namespace)
    _.map(style, (value, key) => {
      if (key.charAt(0) === ':') {
        const selector = parseSelector(key.substr(1))
        const id = styleId(namespace, selector.key, selector.value)
        result[id] = value
        variants.push(selector.key)
      } else {
        result[namespace][key] = value
      }
    })
  })
  return {
    namespaces,
    variants: _.uniq(variants),
    styles: result
  }
}

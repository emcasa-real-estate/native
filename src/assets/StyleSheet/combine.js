import _ from 'lodash/fp'

export default (styles) =>
  _.flow(
    (...args) => args,
    _.map((value) => {
      if (typeof value !== 'string') return value
      else if (value in styles) return styles[value]
      return undefined
    }),
    _.concat([])
  )

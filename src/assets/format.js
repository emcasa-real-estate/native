import _ from 'lodash'

import abbrev from 'number-abbreviate'

export const number = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const abbrevPrice = (num, length = 2) =>
  abbrev(num, length)
    .toString()
    .toUpperCase()
    .replace('.', ',')

export const date = (_date) =>
  [
    _.padStart(_date.getDate(), 2, '0'),
    _.padStart(_date.getMonth() + 1, 2, '0'),
    _date.getFullYear()
  ].join('/')

import 'moment/locale/pt-br'
import moment from 'moment'
import _ from 'lodash'

import abbrev from 'number-abbreviate'

moment.locale('pt-br')

export const number = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const abbrevPrice = (num, length = 2) =>
  abbrev(num, length)
    .toString()
    .toUpperCase()
    .replace('.', ',')

export const timeElapsed = (a, b = Date.now()) => {
  const then = moment.utc(a)
  const now = moment(b)
  const hours = moment.duration(now.diff(then)).asHours()
  if (hours <= 12) return then.from(now)
  else if (hours < 24) return then.format('HH:mm')
  else if (hours < 48) return 'ontem'
  else return then.format('MM/D')
}

export const date = (_date) =>
  [
    _.padStart(_date.getDate(), 2, '0'),
    _.padStart(_date.getMonth() + 1, 2, '0'),
    _date.getFullYear()
  ].join('/')

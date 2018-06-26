import abbrev from 'number-abbreviate'

export const number = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const abbrevPrice = (num, length = 2) =>
  abbrev(num, length)
    .toString()
    .toUpperCase()
    .replace('.', ',')

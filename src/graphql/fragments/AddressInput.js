import _ from 'lodash'
import gql from 'graphql-tag'

const fields = [
  'lat',
  'lng',
  'street',
  'streetNumber',
  'postalCode',
  'neighborhood',
  'city',
  'state'
]

export function parseInput(address) {
  return _.pick(address, fields)
}

export default _.assign(
  gql`
  fragment AddressInput on Address {
    ${fields.join('\n')}
  }
`,
  {parseInput}
)

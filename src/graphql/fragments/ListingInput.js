import _ from 'lodash'
import gql from 'graphql-tag'

import AddressInput from './AddressInput'

export const intFields = [
  'area',
  'balconies',
  'bathrooms',
  'restrooms',
  'rooms',
  'dependencies',
  'garageSpots',
  'price'
]

export const boolFields = ['hasElevator', 'isExclusive', 'isRelease']

export const stringFields = ['type', 'complement', 'description']

export const floatFields = ['propertyTax', 'maintenanceFee']

export function parseInput({address, ...listing}) {
  return _.assign(
    {address: AddressInput.parseInput(address)},
    _.mapValues(_.pick(listing, intFields), parseInt),
    _.mapValues(_.pick(listing, boolFields), Boolean),
    _.mapValues(_.pick(listing, stringFields), String),
    _.mapValues(_.pick(listing, floatFields), parseFloat)
  )
}

const fields = [].concat(intFields, boolFields, stringFields, floatFields)

export default _.assign(
  gql`
  fragment ListingInput on Listing {
    ${fields.join('\n')}
    address {
      ...AddressInput
    }
  }
`,
  {parseInput}
)

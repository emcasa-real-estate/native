import _ from 'lodash/fp'

import Dropdown from '@/components/shared/Form/Dropdown'

const mapInterestTypes = _.map(({id, name}) => ({value: id, label: name}))

export default function InterestTypeField({types, value, onChange}) {
  return (
    <Dropdown
      name="interest_type_id"
      placeholder="Como fazemos?"
      options={mapInterestTypes(types)}
      value={value}
      onChange={onChange}
    />
  )
}

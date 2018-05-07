import _ from 'lodash/fp'
import {Dropdown} from 'react-native-material-dropdown'

const mapInterestTypes = _.map(({id, name}) => ({value: id, label: name}))

export default function InterestTypeField({types, value, onChange}) {
  return (
    <Dropdown
      data={mapInterestTypes(types)}
      value={value}
      onChangeText={onChange}
    />
  )
}

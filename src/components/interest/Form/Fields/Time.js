import _ from 'lodash'
import {Picker} from 'react-native'

import {field} from '@/components/shared/Form/Field'

function Time({onChange, value, interval, ...props}) {
  return (
    <Picker
      selectedValue={value}
      onValueChange={(val) => onChange(val)}
      {...props}
    >
      {interval.map((time) => (
        <Picker.Item key={time} value={time} label={time} />
      ))}
    </Picker>
  )
}

Time.format = (t) => {
  const hour = _.padStart(String(t % 12), 2, '0')
  const period = t / 12 >= 1 ? 'PM' : 'AM'
  return `${hour}:00${period}`
}

Time.defaultProps = {
  interval: _.range(8, 20).map(Time.format)
}

export default field()(Time)

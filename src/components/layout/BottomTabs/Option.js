import styled from 'styled-components/native'
import {TouchableOpacity} from 'react-native'
import {Icon, Text} from '@emcasa/ui-native'

export default styled(({children, icon, type, active, ...props}) => {
  const color = active ? 'pink' : 'dark'
  return (
    <TouchableOpacity {...props}>
      <Icon name={icon} type={type} size={20} color={color} mb={1.5} />
      <Text fontSize={9} color={color}>
        {children}
      </Text>
    </TouchableOpacity>
  )
})`
  padding-vertical: 6;
  align-items: center;
`

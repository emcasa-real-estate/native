import {StyleSheet} from 'react-native'

import {margin} from '@/assets/styles'

export default StyleSheet.create({
  labelHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: -10
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  labelText: {
    fontSize: 18
  },
  labelSuffix: {
    fontSize: 14
  },
  body: {
    margin: 60
  },
  divider: {
    fontSize: 14,
    ...margin(5, 10, null)
  }
})

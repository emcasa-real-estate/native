import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {padding} from '@/assets/styles'

export default StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    ...padding(10, 40)
  },
  field: {
    marginBottom: 15
  },
  divider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray.lighter
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.gray.lighter
  }
})

import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 20
  },
  header: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 15
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.gray.dark
  }
})

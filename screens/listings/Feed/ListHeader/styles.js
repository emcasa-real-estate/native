import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5
  },
  text: {
    width: '80%',
    margin: 2,
    fontSize: 19,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.gray.dark
  }
})

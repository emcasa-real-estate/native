import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: colors.gray.medium,
    backgroundColor: 'white'
  },
  buttonActive: {
    borderColor: colors.blue.border,
    backgroundColor: colors.blue.medium
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray.medium
  },
  textActive: {
    color: 'white'
  }
})

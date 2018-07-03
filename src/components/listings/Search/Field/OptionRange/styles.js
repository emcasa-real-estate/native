import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50
  },
  slider: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray.medium,
    backgroundColor: 'white',
    marginHorizontal: 5
  },
  buttonActive: {
    borderColor: colors.blue.border,
    backgroundColor: colors.blue.medium
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray.medium
  },
  buttonTextActive: {
    color: 'white'
  }
})

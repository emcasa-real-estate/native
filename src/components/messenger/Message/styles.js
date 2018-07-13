import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 5
  },
  bodyContainer: {
    flex: 1
  },
  avatarContainer: {
    width: 46
  },
  text: {
    color: colors.gray.dark,
    fontSize: 14,
    lineHeight: 22
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5
  },
  footerText: {
    color: colors.gray.mediumDark,
    fontSize: 12
  }
})

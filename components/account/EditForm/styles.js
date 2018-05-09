import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: colors.gray.lighter,
    borderBottomWidth: 1
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray.mediumDark,
    marginBottom: 10
  }
})

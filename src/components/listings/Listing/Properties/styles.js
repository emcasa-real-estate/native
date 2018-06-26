import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray.lighter,
    paddingTop: 5,
    paddingBottom: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  property: {
    flex: 1 / 3,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  propertyBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  propertyText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray.dark
  },
  icon: {
    marginBottom: 7
  }
})

export const iconColor = colors.gray.dark

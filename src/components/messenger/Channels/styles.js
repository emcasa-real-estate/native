import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  channel: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray.lighter
  },
  body: {
    flex: 1,
    marginLeft: 15,
    marginRight: 5
  },
  avatar: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: colors.blue.light,
    borderWidth: 1,
    borderColor: colors.blue.medium
  },
  avatarText: {
    fontWeight: '600',
    color: colors.blue.medium
  },
  time: {
    fontSize: 12,
    color: colors.gray.dark
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.gray.dark
  },
  address: {
    fontSize: 13,
    color: colors.gray.light,
    marginBottom: 5
  },
  lastMessage: {
    fontSize: 13,
    color: colors.gray.mediumDark
  }
})

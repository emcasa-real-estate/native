import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  propTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  propTitleText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.gray.dark
  },
  propValueText: {
    fontSize: 16,
    color: colors.gray.dark
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  header: {
    display: 'flex',
    flexDirection: 'row'
  },
  description: {
    flex: 0.5,
    marginLeft: 10
  },
  h1: {
    fontSize: 20,
    color: colors.gray.dark,
    marginBottom: 5
  },
  h2: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray.medium
  },
  imageContainer: {
    flex: 0.5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  image: {
    borderRadius: 5
  },
  statusIcon: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.gray.light
  },
  statusIconActive: {
    backgroundColor: colors.green.medium
  }
})

export const iconColor = colors.gray.dark

import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'
import {elevation} from '@/assets/styles'

export const iconColor = colors.gray.darker

export const buttonUnderlayColor = colors.gray.offWhite

export default StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray.lighter,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'stretch',
    ...elevation(2)
  },
  info: {
    flex: 1
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray.lighter
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray.lighter,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonActive: {
    backgroundColor: colors.gray.offWhite + '50'
  },
  buttonIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.gray.dark
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5
  },
  street: {
    color: colors.gray.darker,
    fontSize: 16,
    marginRight: 15
  },
  neighborhood: {
    color: colors.gray.darker,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 5
  },
  priceText: {
    fontWeight: '300',
    color: colors.gray.darker
  },
  iconButton: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 15
  }
})

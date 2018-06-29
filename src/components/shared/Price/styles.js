import StyleSheet from '@/assets/StyleSheet'
import {padding} from '@/assets/styles'
import * as colors from '@/assets/colors'

export default StyleSheet({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline'
  },
  currency: {
    ...padding(null, 1, null, null)
  },
  text: {
    color: colors.gray.dark,
    ':thin': {
      fontWeight: '300'
    }
  }
})

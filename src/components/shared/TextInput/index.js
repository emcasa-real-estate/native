import {View, TextInput} from 'react-native'

import TextInputMultiline from './TextInputMultiline'
import $styles from './styles'

export default $styles.inject()(
  ({styles, style, inputRef, ...props}) =>
    props.multiline ? (
      <TextInputMultiline
        styles={styles}
        style={style}
        inputRef={inputRef}
        {...props}
      />
    ) : (
      <View style={styles.container.concat(style)}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
          {...props}
        />
      </View>
    )
)

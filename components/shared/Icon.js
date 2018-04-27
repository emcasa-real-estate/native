import {View} from 'react-native'
import {Svg, Path} from 'react-native-svg'
import fontawesome from '@fortawesome/fontawesome'
import faLight from '@fortawesome/fontawesome-pro-light'

fontawesome.library.add(faLight)

const DEFAULT_ICON = 'question-circle'

export default function Icon({name, size, color, style}) {
  let icon = fontawesome.findIconDefinition({prefix: 'fal', iconName: name})
  if (!icon)
    icon = fontawesome.findIconDefinition({
      prefix: 'fal',
      iconName: DEFAULT_ICON
    })

  const data = icon.icon
  const path = data[4]
  const viewBox = [0, 0, data[0], data[1]].join(' ')

  return (
    <View>
      <Svg
        height={size}
        version="1.1"
        viewBox={viewBox}
        width={size}
        x="0"
        y="0"
        style={style}
      >
        <Path d={path} fill={color} />
      </Svg>
    </View>
  )
}

Icon.defaultProps = {
  name: '',
  size: 20,
  color: 'black',
  type: 'light'
}

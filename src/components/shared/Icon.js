import {View} from 'react-native'
import {Svg, Path} from 'react-native-svg'
import fontawesome from '@fortawesome/fontawesome'
import faLight from '@fortawesome/fontawesome-pro-light'
import faSolid from '@fortawesome/fontawesome-pro-solid'
import faBrands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(faLight)
fontawesome.library.add(faSolid)
fontawesome.library.add(faBrands)

const DEFAULT_ICON = 'question-circle'

const FA_STYLES = {
  light: 'fal',
  solid: 'fas',
  brands: 'fab'
}

export default function Icon({name, size, color, type, style, ...props}) {
  const prefix = FA_STYLES[type]
  let icon = fontawesome.findIconDefinition({prefix, iconName: name})
  if (!icon)
    icon = fontawesome.findIconDefinition({
      prefix,
      iconName: DEFAULT_ICON
    })

  const data = icon.icon
  const path = data[4]
  const viewBox = [0, 0, data[0], data[1]].join(' ')

  return (
    <View style={style}>
      <Svg
        height={size}
        version="1.1"
        viewBox={viewBox}
        width={size + 5}
        x="0"
        y="0"
      >
        <Path d={path} scale={1} fill={color} {...props} />
      </Svg>
    </View>
  )
}

Icon.defaultProps = {
  name: '',
  size: 20,
  color: 'black',
  type: 'light',
  pointerEvents: () => false
}

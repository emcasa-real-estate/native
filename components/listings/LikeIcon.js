import * as colors from '@/assets/colors'
import Icon from '@/components/shared/Icon'

export default function LikeIcon({active, contrast}) {
  const color = contrast ? 'black' : 'rgba(0,0,0,0)'
  const border = contrast ? 'white' : 'black'
  return (
    <Icon
      name="heart"
      type="solid"
      stroke={border}
      strokeWidth={25}
      strokeLinecap="round"
      color={active ? colors.red.medium : color}
      fillOpacity={active ? 1 : 0.2}
    />
  )
}

import * as colors from '@/assets/colors'
import Icon from '@/components/shared/Icon'

export default function LikeIcon({active, contrast, size, ...props}) {
  const color = contrast ? 'black' : 'rgba(0,0,0,0)'
  const border = contrast ? 'white' : 'black'
  return (
    <Icon
      name="heart"
      type="solid"
      size={size - 2}
      stroke={border}
      strokeWidth={active && !contrast ? 0 : size}
      strokeLinecap="round"
      color={active ? colors.red.medium : color}
      fillOpacity={active ? 1 : 0.2}
      {...props}
    />
  )
}

LikeIcon.defaultProps = {
  size: 25
}

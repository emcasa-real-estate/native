import combine from './combine'

function merge($styles, styles) {
  if (styles) {
    Object.keys($styles).forEach((key) => {
      if (key in styles) $styles[key] = $styles[key].concat(styles[key])
    })
  }
  $styles.all = combine($styles)
  return $styles
}

export default ($styles) => (mapProps) => (Target) => {
  const displayName = Target.displayName || Target.name
  const Component = ({styles, innerRef, ...props}) => {
    const styleProps = mapProps ? mapProps(props) : props
    if (styles && styles._flat) styles = styles(styleProps)
    return (
      <Target
        ref={innerRef}
        styles={merge($styles(styleProps), styles)}
        {...props}
      />
    )
  }
  Component.displayName = `withStyleSheet(${displayName})`
  Component.defaultProps = Target.defaultProps
  return Component
}

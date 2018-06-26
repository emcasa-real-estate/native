import React from 'react'
import {compose} from 'recompose'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default (...hocs) => (Target) => {
  const ComposedTarget = compose(...hocs)(({screenRef, ...props}) => (
    <Target ref={screenRef} {...props} />
  ))
  const ForwardRef = hoistNonReactStatics(
    React.forwardRef((props, ref) => (
      <ComposedTarget {...props} screenRef={ref} />
    )),
    Target
  )
  ForwardRef.displayName = Target.displayName
  return ForwardRef
}

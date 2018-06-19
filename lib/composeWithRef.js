import React from 'react'
import {compose} from 'recompose'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default (...hocs) => (Target) => {
  const ComposedTarget = compose(...hocs)(({screenRef, ...props}) => (
    <Target ref={screenRef} {...props} />
  ))
  function TargetWithRef(props, ref) {
    return <ComposedTarget {...props} screenRef={ref} />
  }
  return hoistNonReactStatics(React.forwardRef(TargetWithRef), Target)
}

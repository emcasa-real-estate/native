import React, {PureComponent} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default (renderFn, Target) =>
  hoistNonReactStatics(
    class extends PureComponent {
      static displayName = `graphqlContainer(${Target.displayName ||
        Target.name})`

      instance = React.createRef()

      getWrappedInstance() {
        return this.instance.current
      }

      render() {
        return renderFn(this.props, this.instance)
      }
    },
    Target
  )

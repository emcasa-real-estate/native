import _ from 'lodash'
import React, {Component} from 'react'

export default class Loader extends Component {
  componentDidMount() {
    const {onLoad, params} = this.props
    onLoad(params)
  }

  componentDidUpdate(prev) {
    const {onLoad, params} = this.props
    if (!_.isEqual(prev.params, params)) onLoad(params)
  }

  get status() {
    return _.pick(this.props, 'pagination', 'loading', 'error', 'data')
  }

  get childProps() {
    return {
      ...this.status,
      ...this.props.props
    }
  }
  renderChildren() {
    const {children} = this.props
    if (_.isFunction(children)) return children(this.childProps)
    return React.cloneElement(React.Children.only(children), this.childProps)
  }

  render() {
    const {as: TargetComponent, ...props} = this.props
    const children = this.renderChildren()
    if (!TargetComponent) return children
    return <TargetComponent {...props}>{children}</TargetComponent>
  }
}

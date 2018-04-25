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
    return _.omit(this.props, ['children', 'as', 'onLoad'])
  }

  renderChildren() {
    return this.props.children(this.status)
  }

  render() {
    const {as: TargetComponent, onLoad} = this.props
    const children = this.renderChildren()
    if (!TargetComponent) return children
    return (
      <TargetComponent onLoad={onLoad} {...this.status}>
        {children}
      </TargetComponent>
    )
  }
}

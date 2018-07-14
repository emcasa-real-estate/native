import _ from 'lodash/fp'
import update from 'immutability-helper'
import React, {PureComponent} from 'react'
import {View, FlatList} from 'react-native'

import Message from '@/components/messenger/Message'
import styles from './styles'

const isUnread = (sender) => (msg) => !msg.read && msg.sender.id != sender.id

export default class Conversation extends PureComponent {
  list = React.createRef()

  state = {
    unreadIndex: null,
    messages: []
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 100
  }

  static getDerivedStateFromProps({messages, sender}, state) {
    const nextState = {}
    const index = messages.findIndex(isUnread(sender))
    nextState.unreadIndex = Math.max(
      state.unreadIndex,
      index < 0 ? messages.length : index
    )
    if (messages.length !== state.messages.length) {
      nextState.messages = new Array(messages.length).fill({
        layout: {height: 70},
        separator: {height: 10}
      })
      nextState.messages.splice(0, state.messages.length, ...state.messages)
    }
    return nextState
  }

  componentDidMount() {
    const message = this.props.messages[this.state.unreadIndex]
    if (message) {
      this.list.current.scrollToItem({item: message})
    } else {
      this.list.current.scrollToEnd()
    }
  }

  onLayout = (index) => ({nativeEvent: {layout}}) =>
    this.setState((state) =>
      update(state, {
        messages: {
          [index]: {$merge: {layout}}
        }
      })
    )

  onSeparatorLayout = (index) => ({nativeEvent: {layout}}) =>
    this.setState((state) =>
      update(state, {
        messages: {
          [index]: {$merge: {separator: layout}}
        }
      })
    )

  onChangeView = ({viewableItems}) => {
    const {messages, sender, onMarkAsRead} = this.props
    const {unreadIndex} = this.state
    const visibleIndex = Math.max(...viewableItems.map(_.get('index'))) + 1
    if (visibleIndex > unreadIndex) {
      this.setState({unreadIndex: visibleIndex}, () => {
        messages
          .slice(unreadIndex, visibleIndex)
          .filter(isUnread(sender))
          .forEach(({id}) => onMarkAsRead(id))
      })
    }
  }

  keyExtractor = ({id}) => String(id)

  getItemLayout = (__, index) => {
    const {messages} = this.state
    const length = messages[index].layout.height + 10
    const offset = messages
      .slice(0, index)
      .reduce(
        (x, {layout, separator}) => x + layout.height + separator.height,
        0
      )
    return {length, offset, index}
  }

  renderSeparator = ({leadingItem}) => {
    const index = this.props.messages.findIndex(
      (msg) => msg.id == leadingItem.id
    )
    return (
      <View style={{padding: 5}} onLayout={this.onSeparatorLayout(index)} />
    )
  }

  renderMessage = ({item: message, index}) => {
    const {messages, sender} = this.props
    const prevMessage = index > 0 && messages[index - 1]
    const showAvatar =
      !prevMessage || prevMessage.sender.id !== message.sender.id
    return (
      <View onLayout={this.onLayout(index)}>
        <Message
          isSender={sender.id == message.sender.id}
          showAvatar={showAvatar}
          {...message}
        />
      </View>
    )
  }

  render() {
    const {messages} = this.props
    return (
      <FlatList
        ref={this.list}
        contentContainerStyle={styles.container}
        data={messages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMessage}
        getItemLayout={this.getItemLayout}
        ItemSeparatorComponent={this.renderSeparator}
        onViewableItemsChanged={this.onChangeView}
        viewabilityConfig={this.viewabilityConfig}
      />
    )
  }
}

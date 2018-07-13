import update from 'immutability-helper'
import React, {PureComponent} from 'react'
import {View, FlatList} from 'react-native'

import Message from '@/components/messenger/Message'
import styles from './styles'

export default class Conversation extends PureComponent {
  list = React.createRef()

  state = {
    messages: []
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 100
  }

  static getDerivedStateFromProps({messages}, state) {
    if (messages.length === state.messages.length) return null
    const nextMessages = new Array(messages.length).fill({
      layout: {height: 70},
      separator: {height: 10}
    })
    nextMessages.splice(0, state.messages.length, ...state.messages)
    return {messages: nextMessages}
  }

  componentDidMount() {
    const {messages} = this.props
    //const initialItem = this.props.messages.find(({ read }) => !read)
    const initialItem = messages[messages.length - 1]
    if (initialItem) {
      this.list.current.scrollToItem({item: initialItem, animated: true})
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
    viewableItems.forEach(({id, read}) => {
      // if (!read) this.props.markAsRead(id)
    })
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
      prevMessage && prevMessage.sender.id !== message.sender.id
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

import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import composeWithRef from '@/lib/composeWithRef'
import {EDIT_PASSWORD} from '@/graphql/modules/user/mutations'
import {setContext, clearContext} from '@/screens/modules/context'
import {getUser} from '@/redux/modules/auth/selectors'
import {getContext} from '@/screens/modules/context/selectors'
import {Shell, Body, Footer} from '@/components/layout'
import BottomTabs from '@/screens/containers/BottomTabs'
import PasswordForm from '@/components/account/PasswordForm'
import SubmitButtonScreen from '../SubmitButton'

class EditPasswordScreen extends PureComponent {
  static screenName = 'account.EditPassword'

  static options = {
    topBar: {
      title: {text: 'Alterar senha'}
    }
  }

  state = {value: {}}

  form = React.createRef()

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${this.props.componentId}_submit`,
            passProps: {onPress: this.onSubmit},
            component: {name: SubmitButtonScreen.screenName}
          }
        ]
      }
    })
  }

  componentDidDisappear() {
    this.props.clearContext()
  }

  onSubmit = async () => {
    const {setContext, changePassword} = this.props
    const {value} = this.state
    setContext({loading: true})
    try {
      await changePassword(value)
      this.setState({
        value: undefined,
        message: {
          type: 'success',
          text: 'A sua senha foi alterada com sucesso.'
        }
      })
      setContext({loading: false})
    } catch (error) {
      this.setState({
        message: {
          type: 'error',
          text: 'A senha está incorreta'
        }
      })
      setContext({loading: false})
    }
  }

  onChange = (value) => this.setState({value})

  render() {
    const {value, message} = this.state

    return (
      <Shell>
        <Body>
          <PasswordForm
            formRef={this.form}
            message={message}
            value={value}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />
        </Body>
        <Footer>
          <BottomTabs />
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => getContext(state, {screen: 'account'}), {
    setContext: setContext('account'),
    clearContext: clearContext('account')
  }),
  connect((state) => ({
    user: getUser(state)
  })),
  graphql(EDIT_PASSWORD, {
    props: ({mutate, ownProps: {user}}) => ({
      changePassword: (variables) =>
        mutate({variables: {id: user.id, ...variables}})
    })
  })
)(EditPasswordScreen)

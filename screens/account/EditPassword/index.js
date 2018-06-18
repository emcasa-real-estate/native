import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'

import {EDIT_PASSWORD} from '@/lib/graphql/mutations/account'
import {setContext, clearContext} from '@/screens/module/context'
import {getUser} from '@/redux/modules/auth/selectors'
import {getContext} from '@/screens/module/context/selectors'
import PasswordForm from '@/components/account/PasswordForm'
import SubmitButtonScreen from '../SubmitButton'

@connect(
  (state) => getContext(state, {screen: 'account'}),
  {setContext: setContext('account'), clearContext: clearContext('account')},
  null,
  {withRef: true}
)
@connect(
  (state) => ({
    user: getUser(state)
  }),
  null,
  null,
  {withRef: true}
)
@graphql(
  EDIT_PASSWORD,
  {
    props: ({mutate, ownProps: {user}}) => ({
      changePassword: (variables) =>
        mutate({variables: {id: user.id, ...variables}})
    })
  },
  {withRef: true}
)
export default class EditPasswordScreen extends PureComponent {
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
            passProps: {
              onPress: this.onSubmit
            },
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
      <PasswordForm
        formRef={this.form}
        message={message}
        value={value}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    )
  }
}

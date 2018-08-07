import _ from 'lodash/fp'
import React, { PureComponent } from 'react'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import { setContext, clearContext } from '@/screens/modules/context'
import { getContext } from '@/screens/modules/context/selectors'
import { withEmailMutation, withProfileMutation } from '@/graphql/containers'
import { Shell, Body } from '@/components/layout'
import ProfileForm from '@/components/account/ProfileForm'
import EditPasswordScreen from '../EditPassword'
import SubmitButtonScreen from '../SubmitButton'

class EditProfileScreen extends PureComponent {
  static screenName = 'account.EditProfile'

  static options = {
    topBar: {
      title: { text: 'Editar perfil' }
    }
  }

  state = { value: {} }

  form = React.createRef()

  constructor(props) {
    super(props)
    this.state.value = _.flow(
      _.pick(['name', 'phone', 'email']),
      _.mapValues((value) => value || '')
    )(props.user)
  }

  componentDidAppear() {
    const passProps = { onPress: this.onSubmit }
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            passProps,
            id: `${this.props.componentId}_submit`,
            component: { name: SubmitButtonScreen.screenName, passProps }
          }
        ]
      }
    })
  }

  componentDidDisappear() {
    this.props.clearContext()
  }

  onSubmit = async () => {
    const { user, changeEmail, editUserProfile, setContext } = this.props
    const { value } = this.state
    setContext({ loading: true })
    if (user.email != value.email)
      await changeEmail({ variables: { email: value.email } })
    if (user.name != value.name || user.phone != value.phone)
      await editUserProfile({ variables: { name: value.name, phone: value.phone } })
    setContext({ loading: false })
  }

  onChange = (value) => this.setState({ value })

  onEditPassword = () => {
    Navigation.push(this.props.componentId, {
      component: { name: EditPasswordScreen.screenName }
    })
  }

  render() {
    const { user } = this.props
    const { value } = this.state

    return (
      <Shell>
        <Body>
          <ProfileForm
            formRef={this.form}
            user={user}
            value={value}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onEditPassword={this.onEditPassword}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withProfileMutation,
  withEmailMutation,
  connect(
    (state) => getContext(state, { screen: 'account' }),
    {
      setContext: setContext('account'),
      clearContext: clearContext('account')
    }
  )
)(EditProfileScreen)

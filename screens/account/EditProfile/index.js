import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {withProfileMutation} from '@/screens/account/shared/ProfileMutation'
import {withEmailMutation} from '@/screens/account/shared/EmailMutation'
import ProfileForm from '@/components/account/ProfileForm'
import SubmitButtonScreen from '../SubmitButton'

@withProfileMutation
@withEmailMutation
export default class EditProfileScreen extends PureComponent {
  static screenName = 'account.EditProfile'

  static options = {
    topBar: {
      title: {text: 'Editar perfil'}
    }
  }

  state = {
    loading: false,
    value: {}
  }

  form = React.createRef()

  constructor(props) {
    super(props)
    this.state.value = _.flow(
      _.pick(['name', 'phone', 'email']),
      _.mapValues((value) => value || '')
    )(props.user)
  }

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

  onSubmit = async () => {
    const {user, changeEmail, editUserProfile} = this.props
    const {value} = this.state
    this.setState({loading: true})
    if (user.email != value.email)
      await changeEmail({variables: {email: value.email}})
    if (user.name != value.name || user.phone != value.phone)
      await editUserProfile({variables: {name: value.name, phone: value.phone}})
    this.setState({loading: false})
  }

  onChange = (value) => this.setState({value})

  onEditPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {name: null}
    })
  }

  render() {
    const {user} = this.props
    const {value} = this.state

    return (
      <ProfileForm
        formRef={this.form}
        user={user}
        value={value}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onEditPassword={this.onEditPassword}
      />
    )
  }
}

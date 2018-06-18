import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {setContext, clearContext} from '@/screens/module/context'
import {getContext} from '@/screens/module/context/selectors'
import {
  withEmailMutation,
  withProfileMutation
} from '@/graphql/modules/user/containers'
import ProfileForm from '@/components/account/ProfileForm'
import EditPasswordScreen from '../EditPassword'
import SubmitButtonScreen from '../SubmitButton'

@withProfileMutation
@withEmailMutation
@connect(
  (state) => getContext(state, {screen: 'account'}),
  {setContext: setContext('account'), clearContext: clearContext('account')},
  null,
  {withRef: true}
)
export default class EditProfileScreen extends PureComponent {
  static screenName = 'account.EditProfile'

  static options = {
    topBar: {
      title: {text: 'Editar perfil'}
    }
  }

  state = {value: {}}

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

  componentDidDisappear() {
    this.props.clearContext()
  }

  onSubmit = async () => {
    const {user, changeEmail, editUserProfile, setContext} = this.props
    const {value} = this.state
    setContext({loading: true})
    if (user.email != value.email)
      await changeEmail({variables: {email: value.email}})
    if (user.name != value.name || user.phone != value.phone)
      await editUserProfile({variables: {name: value.name, phone: value.phone}})
    setContext({loading: false})
  }

  onChange = (value) => this.setState({value})

  onEditPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {name: EditPasswordScreen.screenName}
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

import React, {PureComponent} from 'react'

import {required} from '@/lib/validations'
import composeWithRef from '@/lib/composeWithRef'
import {withEmailMutation, withProfileMutation} from '@/graphql/containers'
import {Modal, Body, Footer} from '@/components/layout'
import Button from '@/components/shared/Button'
import Form, {TextInput, Email} from '@/components/shared/Form'

class SignUpScreen extends PureComponent {
  static screenName = 'auth.SignUp'

  static options = {
    topBar: {
      title: {text: 'Cadastre-se'}
    }
  }

  state = {
    active: false,
    loading: false,
    value: {}
  }

  form = React.createRef()

  componentDidDisappear() {
    this.setState({value: undefined, active: false})
  }

  componentDidAppear() {
    this.setState({active: true})
  }

  onChange = (value) => this.setState({value})

  onSubmit = async () => {
    const {editUserProfile, changeEmail, onSuccess} = this.props
    const {
      value: {name, email}
    } = this.state
    if (this.state.loading || !this.form.current.onValidate()) return
    this.setState({loading: true, error: undefined})
    try {
      if (email) await changeEmail({email})
      await editUserProfile({name})
      onSuccess()
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({loading: false})
    }
  }

  render() {
    const {loading, value} = this.state

    return (
      <Modal testID="@auth.SignUp">
        <Modal.Header inline>Cadastre-se</Modal.Header>
        <Body loading={loading}>
          <Form
            style={{margin: 15}}
            formRef={this.form}
            value={value}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          >
            <TextInput
              name="name"
              returnKeyType="next"
              nextField="email"
              placeholder="Nome"
              validations={[required('O nome é obrigatório')]}
            />
            <Email
              name="email"
              returnKeyType="done"
              placeholder="Email (opcional)"
              validations={[required(false)]}
            />
          </Form>
        </Body>
        <Footer style={{padding: 15}}>
          <Button disabled={loading} onPress={this.onSubmit}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Modal>
    )
  }
}

export default composeWithRef(withEmailMutation, withProfileMutation)(
  SignUpScreen
)

import {PureComponent} from 'react'
import {Linking, View, TouchableOpacity} from 'react-native'
import Comm from 'react-native-communications'
import {AppInstalledChecker} from 'react-native-check-app-install'

import {required} from '@/lib/validations'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Form, {Email, Phone, TextInput} from '@/components/shared/Form'
import styles, {iconColor} from './styles'

const sendMessage = async (phone) => {
  try {
    if (await AppInstalledChecker.isAppInstalled('whatsapp'))
      await Linking.openURL(`https://wa.me/${phone}`)
    else Comm.text(phone, null)
  } catch (error) {
    console.log(error)
  }
}

function ContactLinks() {
  return (
    <View style={styles.links}>
      <TouchableOpacity
        style={styles.link}
        onPress={() => sendMessage('5521996095399')}
      >
        <Icon name="whatsapp" type="brands" fill={iconColor} size={20} />
        <Text style={styles.linkText}>021 99609-5399</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() =>
          Comm.email(['contato@emcasa.com'], null, null, null, null)
        }
      >
        <Icon name="envelope" fill={iconColor} size={20} />
        <Text style={styles.linkText}>contato@emcasa.com</Text>
      </TouchableOpacity>
    </View>
  )
}

export default class ContactForm extends PureComponent {
  state = {value: undefined}

  static getDerivedStateFromProps({defaultValue}, {value}) {
    return {value: value || defaultValue}
  }

  requirePhoneOrEmail = () => {
    const {email, phone} = this.state.value
    if (!email && !phone) return 'Ao menos uma forma de contato é necessária'
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const {...props} = this.props
    return (
      <Form
        {...props}
        value={this.state.value}
        style={{margin: 15}}
        onChange={this.onChange}
      >
        <TextInput
          name="name"
          placeholder="Nome"
          returnKeyType="next"
          nextField="email"
          validations={[required('O nome é obrigatório')]}
        />
        <Email
          name="email"
          placeholder="Email"
          returnKeyType="next"
          nextField="phone"
          validations={[this.requirePhoneOrEmail, required(false)]}
        />
        <Phone
          name="phone"
          placeholder="Telefone"
          returnKeyType="next"
          nextField="message"
          validations={[this.requirePhoneOrEmail, required(false)]}
        />
        <TextInput
          multiline
          minHeight={120}
          name="message"
          placeholder="Mensagem"
        />
        <View style={{alignItems: 'center'}}>
          <ContactLinks />
        </View>
      </Form>
    )
  }
}

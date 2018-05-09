import Form from '@/components/shared/Form/Form'
import Phone from '@/components/shared/Form/Phone'
import TextInput from '@/components/shared/Form/TextInput'
import {required} from '@/lib/validations'

export default function EditProfileForm({onChange, value}) {
  return (
    <Form onChange={onChange} value={value}>
      <TextInput
        name="name"
        placeholder="Nome"
        validations={[required('O nome é obrigatório')]}
      />
      <Phone name="phone" validations={[required(false)]} />
    </Form>
  )
}

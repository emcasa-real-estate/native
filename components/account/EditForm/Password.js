import Form from '@/components/shared/Form/Form'
import Password from '@/components/shared/Form/Password'

export default function EditPasswordForm({onChange, value}) {
  return (
    <Form onChange={onChange} value={value}>
      <Password name="currentPassword" placeholder="Senha atual" />
      <Password name="newPassword" placeholder="Senha nova" />
    </Form>
  )
}

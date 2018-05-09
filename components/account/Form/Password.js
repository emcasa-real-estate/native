import Form from '@/components/shared/Form/Form'
import Password from '@/components/shared/Form/Password'

export default function EditPasswordForm({onChange, value, formRef}) {
  return (
    <Form formRef={formRef} onChange={onChange} value={value}>
      <Password name="currentPassword" placeholder="Senha atual" />
      <Password name="newPassword" placeholder="Senha nova" />
    </Form>
  )
}

import Shell from '@/containers/shared/Shell'
import Form from '@/containers/account/PasswordForm'

export default function EditPasswordScreen() {
  return (
    <Shell scroll>
      <Form />
    </Shell>
  )
}

export const screen = EditPasswordScreen

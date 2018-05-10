import Shell from '@/containers/shared/Shell'
import Form from '@/containers/account/ProfileForm'

export default function AccountScreen() {
  return (
    <Shell scroll title="Minha conta">
      <Form />
    </Shell>
  )
}

export const screen = AccountScreen

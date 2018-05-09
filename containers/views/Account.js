import Shell from '@/containers/shared/Shell'
import Form from '@/containers/account/Form'

export default function AccountScreen() {
  return (
    <Shell scroll title="Minha conta">
      <Form onSubmit={console.log} />
    </Shell>
  )
}

export const screen = AccountScreen

import Shell from '@/containers/shared/Shell'
import Form from '@/components/account/EditForm'

export default function AccountScreen() {
  return (
    <Shell scroll title="Minha conta">
      <Form onSubmit={console.log} />
    </Shell>
  )
}

export const screen = AccountScreen

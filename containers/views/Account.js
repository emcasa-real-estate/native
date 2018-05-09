import Shell from '@/containers/shared/Shell'
import Form from '@/components/account/EditForm'

export default function AccountScreen() {
  return (
    <Shell title="Minha conta">
      <Form onSubmit={console.log} />
    </Shell>
  )
}

export const screen = AccountScreen

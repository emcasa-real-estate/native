import Form from '@/components/account/EditForm'

export default function AccountScreen() {
  return <Form onSubmit={console.log} />
}

export const screen = AccountScreen

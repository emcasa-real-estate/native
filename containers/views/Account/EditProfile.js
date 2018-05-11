import Shell from '@/containers/shared/Shell'
import Form from '@/containers/account/ProfileForm'

export default function EditProfileScreen({navigation}) {
  return (
    <Shell scroll>
      <Form onChangePassword={() => navigation.navigate('editPassword')} />
    </Shell>
  )
}

export const screen = EditProfileScreen

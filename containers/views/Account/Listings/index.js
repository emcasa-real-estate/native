import Shell from '@/containers/shared/Shell'
import Feed from './Feed'

export default function UserListingsScreen({navigation}) {
  return (
    <Shell scroll title="Meus imóveis">
      <Feed
        onSelect={(id) => navigation.navigate('listing', {id, editing: true})}
      />
    </Shell>
  )
}

export const screen = UserListingsScreen

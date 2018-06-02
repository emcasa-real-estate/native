import Shell from '@/containers/shared/Shell'
import Feed from './Feed'

export default function UserListingsScreen() {
  return (
    <Shell scroll title="Meus imóveis">
      <Feed />
    </Shell>
  )
}

export const screen = UserListingsScreen

import SenderAvatar from '@/components/account/Avatar'
import UserAvatar from '@/components/messenger/UserAvatar'
import AdminAvatar from '@/components/messenger/AdminAvatar'

export default function MessengerAvatar({role, ...props}) {
  if (role === 'admin') return <AdminAvatar {...props} />
  else if (props.isSender) return <SenderAvatar {...props} />
  else return <UserAvatar {...props} />
}

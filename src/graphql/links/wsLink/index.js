import WSLink from './Link'

import {WEB_SOCKET_URL} from '@/lib/config'

export default () => new WSLink(WEB_SOCKET_URL)

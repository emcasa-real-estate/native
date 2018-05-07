import {Gateway} from 'react-gateway'

import {Footer} from '@/components/shared/Shell'

export default function SubmitButton(props) {
  return (
    <Gateway into="footer">
      <Footer {...props} />
    </Gateway>
  )
}

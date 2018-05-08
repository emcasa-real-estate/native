import {Fragment} from 'react'

import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import Time from './Name'
import Name from './Name'
import Message from './Message'

export default function InterestFormFields({type}) {
  return (
    <Fragment>
      <Name name="name" />
      {type === 3 && <Email name="email" />}
      {(type !== 3 || type === 5) && <Phone name="phone" />}
      {type === 2 && <Time name="time" />}
      {type === 3 && <Message name="message" />}
    </Fragment>
  )
}

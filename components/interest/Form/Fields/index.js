import React, {Fragment} from 'react'

import Email from '@/components/shared/Form/Email'
import Phone from '@/components/shared/Form/Phone'
import Time from './Time'
import Name from './Name'
import Message from './Message'

export default function InterestFormFields({type}) {
  const fields = [<Name name="name" />]
  if (type === 3) fields.push(<Email name="email" />)
  if (type !== 3 || type === 5) fields.push(<Phone name="phone" />)
  if (type === 2) fields.push(<Time name="time" />)
  if (type === 3) fields.push(<Message name="message" />)
  return (
    <Fragment>
      {fields.map((node, i) =>
        React.cloneElement(node, {
          key: node.props.name,
          returnKeyType: fields[i + 1] ? 'next' : 'done',
          nextField: fields[i + 1] && fields[i + 1].props.name
        })
      )}
    </Fragment>
  )
}

import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'

export default function EditEmailForm({onChange, value}) {
  return (
    <Form onChange={onChange} value={value}>
      <Email name="email" />
    </Form>
  )
}

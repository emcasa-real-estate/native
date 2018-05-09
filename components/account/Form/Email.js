import Form from '@/components/shared/Form/Form'
import Email from '@/components/shared/Form/Email'

export default function EditEmailForm({onChange, value, formRef}) {
  return (
    <Form formRef={formRef} onChange={onChange} value={value}>
      <Email name="email" />
    </Form>
  )
}

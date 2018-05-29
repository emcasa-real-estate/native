import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Dropdown from '@/components/shared/Form/Dropdown'
import TextInput from '@/components/shared/Form/TextInput'
import NumberPicker from './NumberPicker'
import styles from './styles'

export default function ListingPropertiesForm({onSubmit, loading}) {
  return (
    <Form
      style={styles.container}
      loading={loading}
      onSubmit={onSubmit}
      defaultValue={{
        rooms: 0,
        bathrooms: 0,
        garage_spots: 0,
        maintenance_fee: 0,
        property_tax: 0
      }}
    >
      <Dropdown
        name="type"
        placeholder="Tipo de imóvel"
        options={[
          {value: 'Apartamento', label: 'Apartamento'},
          {value: 'Casa', label: 'Casa'},
          {value: 'Cobertura', label: 'Cobertura'}
        ]}
        validations={[required('O tipo de imóvel é obrigatório')]}
      />
      <NumberPicker label="Quartos" name="rooms" />
      <NumberPicker label="Banheiros" name="bathrooms" />
      <NumberPicker label="Vagas de garagem" name="garage_spots" />
      <TextInput
        name="floor"
        placeholder="Andar"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="area"
      />
      <TextInput
        name="area"
        placeholder="Área (m²)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="maintenance_fee"
        validations={[required('A área é obrigatória')]}
      />
      <TextInput
        name="maintenance_fee"
        placeholder="Condomínio (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="iptu"
      />
      <TextInput
        name="property_tax"
        placeholder="IPTU (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="description"
      />
      <TextInput multiline name="description" placeholder="Descrição" />
    </Form>
  )
}

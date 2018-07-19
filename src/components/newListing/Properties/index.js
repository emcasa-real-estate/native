import {required} from '@/lib/validations'
import Form from '@/components/shared/Form/Form'
import Dropdown from '@/components/shared/Form/Dropdown'
import TextInput from '@/components/shared/Form/TextInput'
import Phone from '@/components/shared/Form/Phone'
import NumberPicker from './NumberPicker'
import styles from './styles'

export default function ListingPropertiesForm({
  requirePhone,
  isAdmin,
  ...props
}) {
  return (
    <Form
      style={styles.container}
      defaultValue={{
        price: undefined,
        rooms: 0,
        bathrooms: 0,
        garageSpots: 0
      }}
      {...props}
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
      {isAdmin && (
        <TextInput
          name="price"
          placeholder="Preço"
          keyboardType="numeric"
          returnKeyType="next"
          nextField="area"
        />
      )}
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
        name="maintenanceFee"
        placeholder="Condomínio (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField="iptu"
      />
      <TextInput
        name="propertyTax"
        placeholder="IPTU (R$)"
        keyboardType="numeric"
        returnKeyType="next"
        nextField={requirePhone ? 'phone' : 'description'}
      />
      {requirePhone && (
        <Phone
          name="phone"
          placeholder="Telefone (obrigatório)"
          nextField="description"
        />
      )}
      <NumberPicker label="Quartos" name="rooms" />
      <NumberPicker label="Banheiros" name="bathrooms" />
      <NumberPicker label="Vagas de garagem" name="garageSpots" />
      <TextInput
        // workaround for nested scroll views matching the same testID
        // https://github.com/wix/detox/issues/164
        multiline={process.env.NODE_ENV !== 'e2e'}
        name="description"
        placeholder="Descrição"
      />
    </Form>
  )
}

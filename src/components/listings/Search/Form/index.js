import {Component} from 'react'

import Form from '@/components/shared/Form/Form'
import Field, {
  SlideRange,
  OptionRange,
  MultiSelect,
  ListingType
} from '../Field'
import AreaLabel from './AreaLabel'
import PriceLabel from './PriceLabel'

export default class SearchForm extends Component {
  onReset = (field) => () => {
    const {onChange, value} = this.props
    onChange({...value, [field]: undefined})
  }

  render() {
    const {value, onChange, onSubmit, onPressNeighborhoods} = this.props
    const price = value.price || {}
    const area = value.area || {}
    return (
      <Form onChange={onChange} onSubmit={onSubmit} value={value}>
        <Field title="Bairros" onReset={this.onReset('neighborhoods')}>
          <MultiSelect
            name="neighborhoods"
            title="Ver bairros"
            onPress={onPressNeighborhoods}
          />
        </Field>
        <Field title="Tipo de imóvel" onReset={this.onReset('types')}>
          <ListingType name="types" />
        </Field>
        <Field title="Preço" onReset={this.onReset('price')}>
          <PriceLabel min={price.min || 100000} max={price.max || 10000000} />
          <SlideRange
            name="price"
            step={100000}
            min={100000}
            max={10000000}
            Label={PriceLabel}
          />
        </Field>
        <Field title="Área" onReset={this.onReset('area')}>
          <AreaLabel min={area.min} max={area.max || 100} />
          <SlideRange name="area" max={1000} step={10} Label={AreaLabel} />
        </Field>
        <Field title="Quartos" onReset={this.onReset('rooms')}>
          <OptionRange
            name="rooms"
            options={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '4+'}
            ]}
          />
        </Field>
        <Field title="Vagas de garagem" onReset={this.onReset('garage_spots')}>
          <OptionRange
            name="garage_spots"
            options={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '4+'}
            ]}
          />
        </Field>
      </Form>
    )
  }
}

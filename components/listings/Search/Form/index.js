import {Component} from 'react'

import Form from '@/components/shared/Form/Form'
import Field, {SlideRange, MultiSelect} from '../Field'
import Label from './Label'
import AreaLabel from './AreaLabel'
import PriceLabel from './PriceLabel'

export default class SearchForm extends Component {
  onReset = (field) => () => {
    const {onChange, value} = this.props
    onChange({...value, [field]: undefined})
  }

  render() {
    const {value, onChange, onSubmit, onPressNeighborhoods} = this.props
    const type = value.type
    const price = value.price || {}
    const area = value.area || {}
    const rooms = value.rooms || {}
    const garageSpots = value.garage_spots || {}
    return (
      <Form onChange={onChange} onSubmit={onSubmit} value={value}>
        <Field title="Bairros" onReset={this.onReset('neighborhoods')}>
          <MultiSelect
            name="neighborhoods"
            title="Ver bairros"
            onPress={onPressNeighborhoods}
          />
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
          <Label
            min={rooms.min || 1}
            max={rooms.max && rooms.max < 4 ? rooms.max : '4+'}
          />
          <SlideRange name="rooms" min={1} max={4} />x
        </Field>
        <Field title="Vagas de garagem" onReset={this.onReset('garage_spots')}>
          <Label
            min={garageSpots.min || 1}
            max={
              garageSpots.max && garageSpots.max < 4 ? garageSpots.max : '4+'
            }
          />
          <SlideRange name="garage_spots" min={1} max={4} />
        </Field>
      </Form>
    )
  }
}

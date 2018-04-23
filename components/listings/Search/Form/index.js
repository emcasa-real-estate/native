import update from 'immutability-helper'
import {Component} from 'react'

import Form from '@/components/shared/Form/Form'
import Field, {SelectRange, SlideRange, MultiSelect} from '../Field'
import AreaLabel from '../Field/SlideRange/AreaLabel'
import PriceLabel from '../Field/SlideRange/PriceLabel'

export default class SearchForm extends Component {
  onReset = (field) => () => {
    const {onChange, value} = this.props
    onChange(update(value, {$remove: [field]}))
  }

  render() {
    const {value, onChange, onSubmit, onPressNeighborhoods} = this.props
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
          <SlideRange
            name="price"
            step={100000}
            min={100000}
            max={10000000}
            Label={PriceLabel}
          />
        </Field>
        <Field title="Área" onReset={this.onReset('area')}>
          <SlideRange name="area" max={1000} step={10} Label={AreaLabel} />
        </Field>
        <Field title="Quartos" onReset={this.onReset('rooms')}>
          <SelectRange
            name="rooms"
            options={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '+4'}
            ]}
          />
        </Field>
      </Form>
    )
  }
}

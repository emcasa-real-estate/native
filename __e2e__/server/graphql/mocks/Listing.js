import faker from 'faker'
import {MockList} from 'graphql-tools'

const matterportCode = [
  'QJygux45Kvx',
  'bvy3rygY2Sq',
  'JRfMzgSDDhb',
  '9N87veHH44i',
  'Nai4bSWCjQp',
  'Q7QBkBxgdQ3',
  'MU72K2wKVte',
  'h3e847x37gM',
  'gdSfPho3V9b',
  '3znDcnP9jen',
  '8FxqPg9yX8w'
]

export default () => ({
  type: () => faker.random.arrayElement(['Casa', 'Apartamento', 'Cobertura']),
  price: () => faker.random.number({min: 500, max: 3000}) * 1000,
  matterportCode: () => faker.random.arrayElement(matterportCode),
  images: () => new MockList([2, 12]),
  isActive: true
})

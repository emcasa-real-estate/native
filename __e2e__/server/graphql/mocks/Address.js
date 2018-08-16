import faker from 'faker'

export default () => ({
  city: faker.address.city,
  state: faker.address.stateAbbr,
  lat: faker.address.latitude,
  lng: faker.address.longitude,
  neighborhood: faker.address.state,
  postalCode: faker.address.zipCode,
  street: faker.address.streetName,
  streetNumber: () => faker.random.number(1000).toString()
})

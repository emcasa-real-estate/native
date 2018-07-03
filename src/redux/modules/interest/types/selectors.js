export const getInterestTypes = (state) => state.interest.types

export const getInterestType = (state, {id}) =>
  getInterestTypes(state).find((type) => type.id == id)

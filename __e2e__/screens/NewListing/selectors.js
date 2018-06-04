export const navButton = () =>
  by.label('Anunciar').withAncestor(by.id('@shared.Shell.Navigation'))
export const addressScreen = () => by.id('@newListing.Login')
export const propertiesScreen = () => by.id('@newListing.SignUp')
export const successScreen = () => by.id('@newListing.Success')
export const input = (label) => by.type('RCTUITextField').and(by.label(label))

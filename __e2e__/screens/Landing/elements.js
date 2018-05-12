export const feed = () => element(by.id('@listings.Feed.Listing'))

export const nthCard = (n) => element(by.id(`@listings.Card.Listing(${n})`))

export const navigation = () => element(by.id('@shared.Shell.Navigation'))

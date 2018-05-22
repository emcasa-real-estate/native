export const feed = () => by.id('@listings.Feed.Listing')
export const nthCard = (n) => by.id(`@listings.Card.Listing(${n})`)
export const navigation = () => by.id('@shared.Shell.Navigation')
export const nthLikeButton = (n) =>
  by.id('@listings.Card.Listing.favoriteButton').withAncestor(nthCard(n))

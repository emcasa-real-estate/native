export const screen = () => by.id('@listings.Feed')
export const feed = () => by.id('listing_feed').withAncestor(screen())
export const nthCard = (n) => by.id(`listing_card(${n})`).withAncestor(screen())
export const nthLikeButton = (n) =>
  by.id('favorite_button').withAncestor(nthCard(n))

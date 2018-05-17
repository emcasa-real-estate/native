export const feed = () => by.id('@listings.Feed.Listing')
export const nthCard = (n) => by.id(`@listings.Card.Listing(${n})`)
export const navigation = () => by.id('@shared.Shell.Navigation')
export const likeNthCard = (n) =>
  by.label('Acidionar aos favoritos').withAncestor(nthCard(n))
export const unlikeNthCard = (n) =>
  by.label('Remover dos favoritos').withAncestor(nthCard(n))

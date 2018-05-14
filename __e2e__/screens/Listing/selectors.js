export const listing = () => by.id('@listings.Listing')
export const map = () => by.id('@listings.Listing.map')
export const modal = () => by.id('@listings.Listing.modal')
export const thumbnail = () => by.id('@listings.Listing.Thumbnail')
export const thumbnailWebView = () =>
  by.type('RCTxxxx').withAncestor(thumbnail())
export const matterportButton = () => by.label('Ver em tela cheia')
export const likeButton = () => by.label('Acidionar aos favoritos')
export const unlikeButton = () => by.label('Remover dos favoritos')

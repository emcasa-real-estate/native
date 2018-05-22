export const listing = () => by.id('@listings.Listing')

export const map = () => by.id('@listings.Listing.map')

export const modal = () => by.id('@listings.Listing.modal')
export const modalWebView = () => by.type('RCTWebView').withAncestor(modal())

export const header = () => by.id('@listings.Listing.header')
export const headerWebView = () => by.type('RCTWebView').withAncestor(header())

export const tourButton = () => by.label('Ver em tela cheia')
export const likeButton = () => by.label('Acidionar aos favoritos')
export const unlikeButton = () => by.label('Remover dos favoritos')

import Shell from '@/containers/shared/Shell'
import Listings from '@/containers/listings/Feed/Favorites'

export default function FavoritesScreen() {
  return (
    <Shell title="Meus imóveis favoritos">
      <Listings />
    </Shell>
  )
}

export const screen = FavoritesScreen

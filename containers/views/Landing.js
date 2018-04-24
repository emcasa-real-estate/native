import Shell from '@/containers/shared/Shell'
import Listings from '@/containers/listings/Feed/Listing'

export default function LandingScreen() {
  return (
    <Shell title="Início" root>
      <Listings type="featured" />
    </Shell>
  )
}

export const screen = LandingScreen

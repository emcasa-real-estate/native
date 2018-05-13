import * as landing from '../Landing/elements'
import * as elements from './elements'

export default async function navigateToListingScreen() {
  await waitFor(landing.feed()).toBeVisible()
  await landing.nthCard(1).tap()
  await waitFor(elements.map()).toExist()
}

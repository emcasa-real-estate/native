import * as landing from '../Landing/selectors'
import {map} from './selectors'

export default async function navigateToListingScreen() {
  await waitFor(element(landing.feed())).toBeVisible()
  await element(landing.nthCard(1)).tap()
  await waitFor(element(map()))
    .toExist()
    .withTimeout(5000)
}

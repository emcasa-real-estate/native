export const SCREEN_APPEARED = 'screen/SCREEN_APPEARED'
export const SCREEN_DISAPPEARED = 'screen/SCREEN_DISAPPEARED'

export const screenAppeared = (id, name) => ({type: SCREEN_APPEARED, id, name})
export const screenDisappeared = (id, name) => ({
  type: SCREEN_DISAPPEARED,
  id,
  name
})

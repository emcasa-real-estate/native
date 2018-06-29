import {get as $get} from '../api'

export function get() {
  return $get('/neighborhoods')
}

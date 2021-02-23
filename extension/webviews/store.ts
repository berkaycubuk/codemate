import { writable } from 'svelte/store'
import type { User } from './types'

/* Pages
  0 => Profile
  1 => People
  2 => Friends
*/

export const page: number | any = writable(0)
export const userStore: User | any = writable(null)
export const personStore: User | any = writable(null)
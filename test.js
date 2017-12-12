import { DateTime } from './src/types'

let current = new DateTime()
current.setTimezone('Hongkong')
console.log(current)
console.log(DateTime.guess())
// console.log(DateTime.timeZones)

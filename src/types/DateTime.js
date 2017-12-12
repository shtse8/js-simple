import moment from 'moment-timezone'
import { DateTimeSimple } from './DateTimeSimple'

export class DateTime extends DateTimeSimple {
  setTimezone (timezone) {
    this.moment.tz(timezone)
    return this
  }

  static guessTimezone () {
    return moment.tz.guess()
  }

  static get timeZones () {
    return moment.tz.names()
  }
}

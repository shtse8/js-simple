import moment from 'moment'
import { Duration } from './Duration'

export class DateTimeSimple {
  constructor (time) {
    this.moment = this.newMoment(time)
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }

  newMoment (time, format = null) {
    let momentObj = null
    if (format) {
      momentObj = moment(time, format)
    } else if (typeof time === 'string') {
      momentObj = moment(time)
    } else if (typeof time === 'number') {
      momentObj = moment.unix(time)
    } else if (time instanceof Array) {
      // Note: Because this mirrors the native Date parameters, months, hours, minutes, seconds, and milliseconds are all zero indexed. Years and days of the month are 1 indexed.
      // Note that like moment(Array) and new Date(year, month, date), months are 0 indexed.
      let object = {
        years: time[0],
        months: time[1] - 1,
        days: time[2],
        hours: time[3],
        minutes: time[4],
        seconds: time[5],
        milliseconds: time[6]
      }
      momentObj = moment(object)
    } else if (moment.isMoment(time)) {
      momentObj = time.clone()
    } else if (time instanceof Date) {
      momentObj = moment(time)
    } else if (time instanceof this.constructor) {
      momentObj = time.toMoment()
    } else {
      momentObj = moment()
    }
    return momentObj.utc() // UTC is our default
  }

  isSame (dateTime) {
    return this.moment.isSame(dateTime.toMoment())
  }

  // Configs - return this
  setTimeZoneOffset (timeZoneOffset = 0) {
    this.moment.utcOffset(timeZoneOffset)
    return this
  }

  // Manipulations - return new this
  add (time, unit = 'seconds') {
    let duration = new Duration(time, unit)
    let newMoment = this.moment.clone().add(duration.toMomentDuration())
    return new this.constructor(newMoment)
  }

  subtract (time, unit = 'seconds') {
    let duration = new Duration(time, unit)
    let newMoment = this.moment.clone().subtract(duration.toMomentDuration())
    return new this.constructor(newMoment)
  }

  // Comparsions - return boolean
  isBefore (time) {
    let targetMoment = this.newMoment(time)
    return this.moment.isBefore(targetMoment)
  }

  isAfter (time) {
    let targetMoment = this.newMoment(time)
    return this.moment.isAfter(targetMoment)
  }

  // Formatters - return string
  toMysqlFormat () {
    return this.moment.format('YYYY-MM-DD HH:mm:ss')
  }

  toTimestamp () {
    return this.moment.unix()
  }

  toMoment () {
    return this.moment.clone()
  }

  toString (format = null) {
    return this.moment.format(format || this.format)
  }

  toJSON () {
    return this.toString()
  }

  inspect () {
    return this.constructor.name + '<' + this.toString() + '>'
  }

  // Durations - return duration in requested unit based
  // if you want to get correct year, please use year here
  // if you want to get correct seconds, please use seconds here
  // let currentTime = new DateTime([2015,1,23])
  // let addDuration = new Duration(3, 'months')
  // let entryTime = currentTime.add(addDuration)
  // let diffDuration = entryTime.diff(currentTime)
  // console.log('month: ', diffDuration.toMonth())
  // console.log('seconds: ', diffDuration.toSecond())
  diff (time, unit = 'second') {
    let targetMoment = this.newMoment(time)
    let diff = this.moment.diff(targetMoment, unit, true)
    return new Duration(diff, unit)
  }

  static microtime () {
    return moment() / 1000
  }
}

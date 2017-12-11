import moment from 'moment'

// Note:
// Duration is second-based class
// The length of a duration in weeks is defined as 7 days.
// The length of a duration in months is defined as 30 days.
// The length of a duration in years is defined as 365 days.
export class Duration {
  constructor (time, unit = 'seconds') {
    this.duration = this.newMomentDuration(time, unit)
  }

  newMomentDuration (time, unit) {
    let momentDuration = null
    if (moment.isDuration(time)) {
      momentDuration = time.clone()
    } else if (time instanceof this.constructor) {
      momentDuration = time.toMomentDuration()
    } else {
      time = Number.parseFloat(time)
      momentDuration = moment.duration(time, unit)
    }
    return momentDuration
  }

  subtract (time, unit = 'seconds') {
    let timeDuration = new this.constructor(time, unit)
    let momentDuration = this.duration.clone().subtract(timeDuration.toMomentDuration())
    return new this.constructor(momentDuration)
  }

  add (time, unit = 'seconds') {
    let timeDuration = new this.constructor(time, unit)
    let momentDuration = this.duration.clone().add(timeDuration.toMomentDuration())
    return new this.constructor(momentDuration)
  }

  gt (duration) {
    return this.subtract(duration).toSecond() > 0
  }

  gte (duration) {
    return this.subtract(duration).toSecond() >= 0
  }

  lt (duration) {
    return this.subtract(duration).toSecond() < 0
  }

  lte (duration) {
    return this.subtract(duration).toSecond() <= 0
  }

  toMomentDuration () {
    return this.duration.clone()
  }

  toHumanFormat (locale = 'en') {
    return this.duration.clone().locale(locale).humanize(true)
  }

  toSecond () {
    return this.duration.clone().asSeconds()
  }

  toHour () {
    return this.duration.clone().asHours()
  }

  toDay () {
    return this.duration.clone().asDays()
  }

  toWeek () {
    return this.duration.clone().asWeeks()
  }

  toMonth () {
    return this.duration.clone().asMonths()
  }

  toYear () {
    return this.duration.clone().asYears()
  }

  inspect () {
    return this.toSecond()
  }
}

const NS_PER_SEC = 1e9

export class Timer {
  constructor () {
    this.start()
  }

  start () {
    this.startedAt = process.hrtime()
    this.stoppedAt = null
    this.time = null
  }

  stop () {
    this.stoppedAt = process.hrtime()
    let startedAt = this.constructor.processTuple(this.startedAt)
    let stoppedAt = this.constructor.processTuple(this.stoppedAt)
    this.time = stoppedAt - startedAt
    return this.time
  }

  get () {
    return this.time
  }

  static processTuple (tuple) {
    return tuple[0] + tuple[1] / NS_PER_SEC
  }

  static get () {
    return this.processTuple(process.hrtime())
  }
}

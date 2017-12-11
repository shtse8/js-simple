import _ from 'lodash'

export class Listener {
  constructor (stopCallback) {
    if (!_.isFunction(stopCallback)) {
      throw new Error('Stop callback must be a function, but got: ' + typeof stopCallback)
    }
    this.stopCallback = stopCallback
  }

  async stop () {
    if (!this.stopCallback) {
      throw new Error('Listener is stopped already.')
    }
    let result = await this.stopCallback()
    this.stopCallback = null
    return result
  }

  static setTimeout (...args) {
    let listener = setTimeout(...args)
    return new this(() => clearTimeout(listener))
  }

  static setInterval (...args) {
    let listener = setInterval(...args)
    return new this(() => clearInterval(listener))
  }
}

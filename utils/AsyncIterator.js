import { Listener } from './'
import { $$asyncIterator } from 'iterall'
import EventEmitter from 'events'

export class AsyncIterator {
  constructor () {
    this.eventEmitter = new EventEmitter()
    this.buffer = []
    this.counter = 0
  }

  push (value) {
    this.buffer.push(value)
    this.eventEmitter.emit('push', value)
  }

  getValueFromBuffer () {
    return new Promise((resolve, reject) => {
      if (this.buffer.length > 0) {
        resolve(this.buffer.shift())
      } else {
        this.eventEmitter.once('push', () => {
          resolve(this.getValueFromBuffer())
        })
      }
    })
  }

  async next () {
    this.eventEmitter.emit(this.counter > 0 ? 'next' : 'begin')
    let value = await this.getValueFromBuffer()
    ++this.counter
    return {
      value: value,
      done: false
    }
  }

  async return () {
    this.eventEmitter.emit('return')
    return {
      value: undefined,
      done: true
    }
  }

  throw (error) {
    this.eventEmitter.emit('throw')
    console.log('throw() is called. arguments:', arguments)
    return error
  }

  once (eventName, callback) {
    this.eventEmitter.once(eventName, callback)
    return new Listener(() => this.eventEmitter.removeListener(eventName, callback))
  }

  on (eventName, callback) {
    this.eventEmitter.on(eventName, callback)
    return new Listener(() => this.eventEmitter.removeListener(eventName, callback))
  }

  [$$asyncIterator] () {
    return this
  }
}

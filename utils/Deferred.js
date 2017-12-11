export class Deferred {
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
    this.state = 'pending'
  }

  resolve (result) {
    this.state = 'resolved'
    this._resolve(result)
  }

  reject (error) {
    this.state = 'rejected'
    this._reject(error)
  }
}

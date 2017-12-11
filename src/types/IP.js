import { Address6 } from 'ip-address'

export class IP {
  constructor (ip) {
    if (ip instanceof Buffer) {
      this.address6 = Address6.fromUnsignedByteArray([...ip])
    } else if (ip instanceof this.constructor) {
      this.address6 = new Address6(ip.to6())
    } else if (typeof ip === 'string') {
      /* Check and create address6 object correctly */
      this.address6 = new Address6(ip)
      if (!this.address6.isValid() && this.address6.v4) {
        this.address6 = Address6.fromAddress4(ip)
      }
    } else {
      throw new Error('Only support String and Buffer.')
    }
    if (!this.address6.isValid()) {
      throw new Error('the input is not a valid ip address.')
    }
  }

  isSame (ip) {
    return this.toString() === ip.toString()
  }

  toJSON () {
    return this.toString()
  }

  toString () {
    return this.to6()
  }

  inspect () {
    return this.toString()
  }

  to6 () {
    return this.address6.to4in6()
  }

  toByteArray () {
    return this.address6.toByteArray()
  }

  toUnsignedByteArray () {
    return this.address6.toUnsignedByteArray()
  }

  toBuffer () {
    let size = 16
    let buffer = Buffer.alloc(size)
    let byteArray = this.toUnsignedByteArray()
    let offset = size - byteArray.length
    for (let i = 0; i < byteArray.length; i++) {
      buffer.writeUInt8(byteArray[i], offset + i)
    }
    return buffer
  }

  // Todo
  getCountry () {

  }

  // Todo
  getCity () {

  }
}

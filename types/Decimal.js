import { DecimalSimple } from './DecimalSimple'
import DecimalJs from 'decimal.js'

export class Decimal extends DecimalSimple {
  constructor (decimal = 0, base = 10) {
    switch (base) {
      case 16:
        if (!decimal.startsWith('0x')) {
          decimal = '0x' + decimal
        }
        break
      case 10:
        break
      case 8:
        if (!decimal.startsWith('0o')) {
          decimal = '0o' + decimal
        }
        break
      case 2:
        if (!decimal.startsWith('0b')) {
          decimal = '0b' + decimal
        }
        break
      default:
        throw new Error('Not supported base: ' + base)
    }
    super(decimal)
  }

  // Self Methods
  clone () {
    return new this.constructor(this.toString())
  }

  sin () {
    return new this.constructor(this.decimal.sine())
  }

  asin () {
    return new this.constructor(this.decimal.inverseSine())
  }

  cos () {
    return new this.constructor(this.decimal.cosine())
  }

  acos () {
    return new this.constructor(this.decimal.inverseCosine())
  }

  tan () {
    return new this.constructor(this.decimal.tangent())
  }

  atan () {
    return new this.constructor(this.decimal.inverseTangent())
  }

  // Primitive Methods
  isFinite () {
    return this.decimal.isFinite()
  }

  isInt () {
    return this.decimal.isInteger()
  }

  isNaN () {
    return this.decimal.isNaN()
  }

  toBinary (sd, rm) {
    return this.decimal.toBinary(sd, rm)
  }

  toOctal (sd, rm) {
    return this.decimal.toOctal(sd, rm)
  }

  toHex (sd, rm) {
    return this.decimal.toHexadecimal(sd, rm)
  }

  toDecimal () {
    return new Decimal(this.toString())
  }

  static toDecimalJs (decimal) {
    if (decimal instanceof this) {
      return new DecimalJs(decimal.toString())
    } else if (decimal instanceof DecimalSimple) {
      return new DecimalJs(decimal.toString())
    } else if (decimal instanceof DecimalJs) {
      return decimal
    } else {
      return new DecimalJs(decimal)
    }
  }

  static sin (x) {
    return new this(x).sin()
  }

  static cos (x) {
    return new this(x).cos()
  }

  static tan (x) {
    return new this(x).tan()
  }

  static asin (x) {
    return new this(x).asin()
  }

  static acos (x) {
    return new this(x).acos()
  }

  static atan (x) {
    return new this(x).atan()
  }

  static random (dp) {
    return new this(DecimalJs.random(dp))
  }

  static get Pi () {
    return new this(-1).acos()
  }
}

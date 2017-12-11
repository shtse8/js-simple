import DecimalJs from 'decimal.js-light'
import _ from 'lodash'

export class DecimalSimple {
  constructor (decimal = 0) {
    this.decimal = this.constructor.toDecimalJs(decimal)
    this.format = {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '',
      fractionGroupSize: 0
    }
  }

  // Self Methods
  clone () {
    return new this.constructor(this.toString())
  }

  add (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.plus(x))
  }

  sub (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.sub(x))
  }

  mul (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.times(x))
  }

  div (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.dividedBy(x))
  }

  log (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.logarithm(x))
  }

  mod (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.modulo(x))
  }

  exp () {
    return new this.constructor(this.decimal.naturalExponential())
  }

  lm () {
    return new this.constructor(this.decimal.naturalLogarithm())
  }

  neg () {
    return new this.constructor(this.decimal.negated())
  }

  pow (x) {
    x = this.constructor.toDecimalJs(x)
    return new this.constructor(this.decimal.pow(x))
  }

  toDP (dp, rm) {
    return new this.constructor(this.decimal.toDecimalPlaces(dp, rm))
  }

  toSD (sd, rm) {
    return new this.constructor(this.decimal.toSignificantDigits(sd, rm))
  }

  trunc () {
    return new this.constructor(this.decimal.truncated())
  }

  floor () {
    return this.toDP(0, this.constructor.ROUND_FLOOR)
  }

  ceil () {
    return this.toDP(0, this.constructor.ROUND_CEIL)
  }

  round () {
    return this.toDP(0, this.constructor.ROUND_CEIL)
  }

  sqrt () {
    return new this.constructor(this.decimal.squareRoot())
  }

  abs () {
    return new this.constructor(this.decimal.absoluteValue())
  }

  // Primitive Methods
  precision (includeZeros) {
    return this.decimal.precision(includeZeros)
  }

  isInt () {
    return this.decimal.isInteger()
  }

  cmp (x) {
    x = this.constructor.toDecimalJs(x)
    return this.decimal.comparedTo(x)
  }

  gt (x) {
    return this.cmp(x) === 1
  }

  gte (x) {
    return this.cmp(x) >= 0
  }

  lt (x) {
    return this.cmp(x) === -1
  }

  lte (x) {
    return this.cmp(x) <= 0
  }

  eq (x) {
    return this.cmp(x) === 0
  }

  isPos () {
    return this.gte(0)
  }

  isNeg () {
    return this.lt(0)
  }

  isZero () {
    return this.eq(0)
  }

  inspect () {
    return this.constructor.name + '<' + this.toString() + '>'
  }

  toString () {
    return this.decimal.toString()
  }

  toJSON () {
    return this.decimal.toJSON()
  }

  valueOf () {
    return this.decimal.valueOf()
  }

  toNumber () {
    return this.decimal.toNumber()
  }

  toFixed (dp, rm) {
    return this.decimal.toFixed(dp, rm)
  }

  toPrecision (sd, rm) {
    return this.decimal.toPrecision(sd, rm)
  }

  toExponential (dp, rm) {
    return this.decimal.toExponential(dp, rm)
  }

  toFormat (dp, rm, fmt) {
    if (!this.decimal.e && this.decimal.e !== 0) return this.toString() // Infinity/NaN

    let arr
    let g1
    let g2
    let i
    let u // undefined
    let nd // number of integer digits
    let intd // integer digits
    let intp // integer part
    let fracp // fraction part
    let dsep // decimalSeparator
    let gsep // groupSeparator
    let gsize // groupSize
    let sgsize // secondaryGroupSize
    let fgsep // fractionGroupSeparator
    let fgsize // fractionGroupSize
    let tfmt = this.format || {}
    let cfmt = this.constructor.format || {}

    if (dp !== u) {
      if (typeof dp === 'object') {
        fmt = dp
        dp = u
      } else if (rm !== u) {
        if (typeof rm === 'object') {
          fmt = rm
          rm = u
        } else if (typeof fmt !== 'object') {
          fmt = {}
        }
      } else {
        fmt = {}
      }
    } else {
      fmt = {}
    }

    arr = this.toFixed(dp, rm).split('.')
    intp = arr[0]
    fracp = arr[1]
    intd = this.decimal.s < 0 ? intp.slice(1) : intp
    nd = intd.length

    dsep = fmt.decimalSeparator
    if (dsep === u) {
      dsep = tfmt.decimalSeparator
      if (dsep === u) {
        dsep = cfmt.decimalSeparator
        if (dsep === u) dsep = '.'
      }
    }

    gsep = fmt.groupSeparator
    if (gsep === u) {
      gsep = tfmt.groupSeparator
      if (gsep === u) gsep = cfmt.groupSeparator
    }

    if (gsep) {
      gsize = fmt.groupSize
      if (gsize === u) {
        gsize = tfmt.groupSize
        if (gsize === u) {
          gsize = cfmt.groupSize
          if (gsize === u) gsize = 0
        }
      }

      sgsize = fmt.secondaryGroupSize
      if (sgsize === u) {
        sgsize = tfmt.secondaryGroupSize
        if (sgsize === u) {
          sgsize = cfmt.secondaryGroupSize
          if (sgsize === u) sgsize = 0
        }
      }

      if (sgsize) {
        g1 = +sgsize
        g2 = +gsize
        nd -= g2
      } else {
        g1 = +gsize
        g2 = +sgsize
      }

      if (g1 > 0 && nd > 0) {
        i = nd % g1 || g1
        intp = intd.substr(0, i)
        for (; i < nd; i += g1) intp += gsep + intd.substr(i, g1)
        if (g2 > 0) intp += gsep + intd.slice(i)
        if (this.decimal.s < 0) intp = '-' + intp
      }
    }

    if (fracp) {
      fgsep = fmt.fractionGroupSeparator
      if (fgsep === u) {
        fgsep = tfmt.fractionGroupSeparator
        if (fgsep === u) fgsep = cfmt.fractionGroupSeparator
      }

      if (fgsep) {
        fgsize = fmt.fractionGroupSize
        if (fgsize === u) {
          fgsize = tfmt.fractionGroupSize
          if (fgsize === u) {
            fgsize = cfmt.fractionGroupSize
            if (fgsize === u) fgsize = 0
          }
        }

        fgsize = +fgsize

        if (fgsize) {
          fracp = fracp.replace(new RegExp('\\d{' + fgsize + '}\\B', 'g'), '$&' + fgsep)
        }
      }

      return intp + dsep + fracp
    } else {
      return intp
    }
  }

  static toDecimalJs (decimal) {
    if (decimal instanceof this) {
      return new DecimalJs(decimal.toString())
    } else if (decimal instanceof DecimalJs) {
      return decimal
    } else {
      return new DecimalJs(decimal)
    }
  }

  static max (...decimals) {
    decimals = decimals.map(decimal => new this(decimal))
    return _.reduce(decimals, (max, decimal) => {
      return max && decimal.gt(max) ? decimal : max
    })
  }

  static min (...decimals) {
    decimals = decimals.map(decimal => new this(decimal))
    return _.reduce(decimals, (min, decimal) => {
      return min && decimal.lt(min) ? decimal : min
    })
  }

  static sum (...decimals) {
    decimals = decimals.map(decimal => new this(decimal))
    return _.reduce(decimals, (sum, decimal) => {
      return sum ? sum.add(decimal) : decimal
    })
  }

  static avg (...decimals) {
    return this.sum(...decimals).div(decimals.length)
  }

  static get ROUND_UP () {
    return DecimalJs.ROUND_UP
  }

  static get ROUND_DOWN () {
    return DecimalJs.ROUND_DOWN
  }

  static get ROUND_CEIL () {
    return DecimalJs.ROUND_CEIL
  }

  static get ROUND_FLOOR () {
    return DecimalJs.ROUND_FLOOR
  }

  static get ROUND_HALF_UP () {
    return DecimalJs.ROUND_HALF_UP
  }

  static get ROUND_HALF_DOWN () {
    return DecimalJs.ROUND_HALF_DOWN
  }

  static get ROUND_HALF_EVEN () {
    return DecimalJs.ROUND_HALF_EVEN
  }

  static get ROUND_HALF_CEIL () {
    return DecimalJs.ROUND_HALF_CEIL
  }

  static get ROUND_HALF_FLOOR () {
    return DecimalJs.ROUND_HALF_FLOOR
  }

  static get EUCLID () {
    return DecimalJs.EUCLID
  }
}

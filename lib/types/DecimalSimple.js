"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DecimalSimple = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _decimal = _interopRequireDefault(require("decimal.js-light"));

var _lodash = _interopRequireDefault(require("lodash"));

var DecimalSimple =
/*#__PURE__*/
function () {
  function DecimalSimple() {
    var decimal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    (0, _classCallCheck2.default)(this, DecimalSimple);
    this.decimal = this.constructor.toDecimalJs(decimal);
    this.format = {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '',
      fractionGroupSize: 0
    };
  } // Self Methods


  (0, _createClass2.default)(DecimalSimple, [{
    key: "clone",
    value: function clone() {
      return new this.constructor(this.toString());
    }
  }, {
    key: "add",
    value: function add(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.plus(x));
    }
  }, {
    key: "sub",
    value: function sub(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.sub(x));
    }
  }, {
    key: "mul",
    value: function mul(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.times(x));
    }
  }, {
    key: "div",
    value: function div(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.dividedBy(x));
    }
  }, {
    key: "log",
    value: function log(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.logarithm(x));
    }
  }, {
    key: "mod",
    value: function mod(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.modulo(x));
    }
  }, {
    key: "exp",
    value: function exp() {
      return new this.constructor(this.decimal.naturalExponential());
    }
  }, {
    key: "lm",
    value: function lm() {
      return new this.constructor(this.decimal.naturalLogarithm());
    }
  }, {
    key: "neg",
    value: function neg() {
      return new this.constructor(this.decimal.negated());
    }
  }, {
    key: "pow",
    value: function pow(x) {
      x = this.constructor.toDecimalJs(x);
      return new this.constructor(this.decimal.pow(x));
    }
  }, {
    key: "toDP",
    value: function toDP(dp, rm) {
      return new this.constructor(this.decimal.toDecimalPlaces(dp, rm));
    }
  }, {
    key: "toSD",
    value: function toSD(sd, rm) {
      return new this.constructor(this.decimal.toSignificantDigits(sd, rm));
    }
  }, {
    key: "trunc",
    value: function trunc() {
      return new this.constructor(this.decimal.truncated());
    }
  }, {
    key: "floor",
    value: function floor() {
      return this.toDP(0, this.constructor.ROUND_FLOOR);
    }
  }, {
    key: "ceil",
    value: function ceil() {
      return this.toDP(0, this.constructor.ROUND_CEIL);
    }
  }, {
    key: "round",
    value: function round() {
      return this.toDP(0, this.constructor.ROUND_CEIL);
    }
  }, {
    key: "sqrt",
    value: function sqrt() {
      return new this.constructor(this.decimal.squareRoot());
    }
  }, {
    key: "abs",
    value: function abs() {
      return new this.constructor(this.decimal.absoluteValue());
    } // Primitive Methods

  }, {
    key: "precision",
    value: function precision(includeZeros) {
      return this.decimal.precision(includeZeros);
    }
  }, {
    key: "isInt",
    value: function isInt() {
      return this.decimal.isInteger();
    }
  }, {
    key: "cmp",
    value: function cmp(x) {
      x = this.constructor.toDecimalJs(x);
      return this.decimal.comparedTo(x);
    }
  }, {
    key: "gt",
    value: function gt(x) {
      return this.cmp(x) === 1;
    }
  }, {
    key: "gte",
    value: function gte(x) {
      return this.cmp(x) >= 0;
    }
  }, {
    key: "lt",
    value: function lt(x) {
      return this.cmp(x) === -1;
    }
  }, {
    key: "lte",
    value: function lte(x) {
      return this.cmp(x) <= 0;
    }
  }, {
    key: "eq",
    value: function eq(x) {
      return this.cmp(x) === 0;
    }
  }, {
    key: "isPos",
    value: function isPos() {
      return this.gte(0);
    }
  }, {
    key: "isNeg",
    value: function isNeg() {
      return this.lt(0);
    }
  }, {
    key: "isZero",
    value: function isZero() {
      return this.eq(0);
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.constructor.name + '<' + this.toString() + '>';
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.decimal.toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.decimal.toJSON();
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.decimal.valueOf();
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.decimal.toNumber();
    }
  }, {
    key: "toFixed",
    value: function toFixed(dp, rm) {
      return this.decimal.toFixed(dp, rm);
    }
  }, {
    key: "toPrecision",
    value: function toPrecision(sd, rm) {
      return this.decimal.toPrecision(sd, rm);
    }
  }, {
    key: "toExponential",
    value: function toExponential(dp, rm) {
      return this.decimal.toExponential(dp, rm);
    }
  }, {
    key: "toFormat",
    value: function toFormat(dp, rm, fmt) {
      if (!this.decimal.e && this.decimal.e !== 0) return this.toString(); // Infinity/NaN

      var arr;
      var g1;
      var g2;
      var i;
      var u; // undefined

      var nd; // number of integer digits

      var intd; // integer digits

      var intp; // integer part

      var fracp; // fraction part

      var dsep; // decimalSeparator

      var gsep; // groupSeparator

      var gsize; // groupSize

      var sgsize; // secondaryGroupSize

      var fgsep; // fractionGroupSeparator

      var fgsize; // fractionGroupSize

      var tfmt = this.format || {};
      var cfmt = this.constructor.format || {};

      if (dp !== u) {
        if ((0, _typeof2.default)(dp) === 'object') {
          fmt = dp;
          dp = u;
        } else if (rm !== u) {
          if ((0, _typeof2.default)(rm) === 'object') {
            fmt = rm;
            rm = u;
          } else if ((0, _typeof2.default)(fmt) !== 'object') {
            fmt = {};
          }
        } else {
          fmt = {};
        }
      } else {
        fmt = {};
      }

      arr = this.toFixed(dp, rm).split('.');
      intp = arr[0];
      fracp = arr[1];
      intd = this.decimal.s < 0 ? intp.slice(1) : intp;
      nd = intd.length;
      dsep = fmt.decimalSeparator;

      if (dsep === u) {
        dsep = tfmt.decimalSeparator;

        if (dsep === u) {
          dsep = cfmt.decimalSeparator;
          if (dsep === u) dsep = '.';
        }
      }

      gsep = fmt.groupSeparator;

      if (gsep === u) {
        gsep = tfmt.groupSeparator;
        if (gsep === u) gsep = cfmt.groupSeparator;
      }

      if (gsep) {
        gsize = fmt.groupSize;

        if (gsize === u) {
          gsize = tfmt.groupSize;

          if (gsize === u) {
            gsize = cfmt.groupSize;
            if (gsize === u) gsize = 0;
          }
        }

        sgsize = fmt.secondaryGroupSize;

        if (sgsize === u) {
          sgsize = tfmt.secondaryGroupSize;

          if (sgsize === u) {
            sgsize = cfmt.secondaryGroupSize;
            if (sgsize === u) sgsize = 0;
          }
        }

        if (sgsize) {
          g1 = +sgsize;
          g2 = +gsize;
          nd -= g2;
        } else {
          g1 = +gsize;
          g2 = +sgsize;
        }

        if (g1 > 0 && nd > 0) {
          i = nd % g1 || g1;
          intp = intd.substr(0, i);

          for (; i < nd; i += g1) {
            intp += gsep + intd.substr(i, g1);
          }

          if (g2 > 0) intp += gsep + intd.slice(i);
          if (this.decimal.s < 0) intp = '-' + intp;
        }
      }

      if (fracp) {
        fgsep = fmt.fractionGroupSeparator;

        if (fgsep === u) {
          fgsep = tfmt.fractionGroupSeparator;
          if (fgsep === u) fgsep = cfmt.fractionGroupSeparator;
        }

        if (fgsep) {
          fgsize = fmt.fractionGroupSize;

          if (fgsize === u) {
            fgsize = tfmt.fractionGroupSize;

            if (fgsize === u) {
              fgsize = cfmt.fractionGroupSize;
              if (fgsize === u) fgsize = 0;
            }
          }

          fgsize = +fgsize;

          if (fgsize) {
            fracp = fracp.replace(new RegExp('\\d{' + fgsize + '}\\B', 'g'), '$&' + fgsep);
          }
        }

        return intp + dsep + fracp;
      } else {
        return intp;
      }
    }
  }], [{
    key: "toDecimalJs",
    value: function toDecimalJs(decimal) {
      if (decimal instanceof this) {
        return new _decimal.default(decimal.toString());
      } else if (decimal instanceof _decimal.default) {
        return decimal;
      } else {
        return new _decimal.default(decimal);
      }
    }
  }, {
    key: "max",
    value: function max() {
      var _this = this;

      for (var _len = arguments.length, decimals = new Array(_len), _key = 0; _key < _len; _key++) {
        decimals[_key] = arguments[_key];
      }

      decimals = decimals.map(function (decimal) {
        return new _this(decimal);
      });
      return _lodash.default.reduce(decimals, function (max, decimal) {
        return max && decimal.gt(max) ? decimal : max;
      });
    }
  }, {
    key: "min",
    value: function min() {
      var _this2 = this;

      for (var _len2 = arguments.length, decimals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        decimals[_key2] = arguments[_key2];
      }

      decimals = decimals.map(function (decimal) {
        return new _this2(decimal);
      });
      return _lodash.default.reduce(decimals, function (min, decimal) {
        return min && decimal.lt(min) ? decimal : min;
      });
    }
  }, {
    key: "sum",
    value: function sum() {
      var _this3 = this;

      for (var _len3 = arguments.length, decimals = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        decimals[_key3] = arguments[_key3];
      }

      decimals = decimals.map(function (decimal) {
        return new _this3(decimal);
      });
      return _lodash.default.reduce(decimals, function (sum, decimal) {
        return sum ? sum.add(decimal) : decimal;
      });
    }
  }, {
    key: "avg",
    value: function avg() {
      return this.sum.apply(this, arguments).div(arguments.length);
    }
  }, {
    key: "ROUND_UP",
    get: function get() {
      return _decimal.default.ROUND_UP;
    }
  }, {
    key: "ROUND_DOWN",
    get: function get() {
      return _decimal.default.ROUND_DOWN;
    }
  }, {
    key: "ROUND_CEIL",
    get: function get() {
      return _decimal.default.ROUND_CEIL;
    }
  }, {
    key: "ROUND_FLOOR",
    get: function get() {
      return _decimal.default.ROUND_FLOOR;
    }
  }, {
    key: "ROUND_HALF_UP",
    get: function get() {
      return _decimal.default.ROUND_HALF_UP;
    }
  }, {
    key: "ROUND_HALF_DOWN",
    get: function get() {
      return _decimal.default.ROUND_HALF_DOWN;
    }
  }, {
    key: "ROUND_HALF_EVEN",
    get: function get() {
      return _decimal.default.ROUND_HALF_EVEN;
    }
  }, {
    key: "ROUND_HALF_CEIL",
    get: function get() {
      return _decimal.default.ROUND_HALF_CEIL;
    }
  }, {
    key: "ROUND_HALF_FLOOR",
    get: function get() {
      return _decimal.default.ROUND_HALF_FLOOR;
    }
  }, {
    key: "EUCLID",
    get: function get() {
      return _decimal.default.EUCLID;
    }
  }]);
  return DecimalSimple;
}();

exports.DecimalSimple = DecimalSimple;
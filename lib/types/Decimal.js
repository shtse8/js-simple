"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decimal = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _DecimalSimple2 = require("./DecimalSimple");

var _decimal = _interopRequireDefault(require("decimal.js"));

var Decimal =
/*#__PURE__*/
function (_DecimalSimple) {
  (0, _inherits2.default)(Decimal, _DecimalSimple);

  function Decimal() {
    var decimal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    (0, _classCallCheck2.default)(this, Decimal);

    switch (base) {
      case 16:
        if (!decimal.startsWith('0x')) {
          decimal = '0x' + decimal;
        }

        break;

      case 10:
        break;

      case 8:
        if (!decimal.startsWith('0o')) {
          decimal = '0o' + decimal;
        }

        break;

      case 2:
        if (!decimal.startsWith('0b')) {
          decimal = '0b' + decimal;
        }

        break;

      default:
        throw new Error('Not supported base: ' + base);
    }

    return (0, _possibleConstructorReturn2.default)(this, (Decimal.__proto__ || (0, _getPrototypeOf.default)(Decimal)).call(this, decimal));
  } // Self Methods


  (0, _createClass2.default)(Decimal, [{
    key: "clone",
    value: function clone() {
      return new this.constructor(this.toString());
    }
  }, {
    key: "sin",
    value: function sin() {
      return new this.constructor(this.decimal.sine());
    }
  }, {
    key: "asin",
    value: function asin() {
      return new this.constructor(this.decimal.inverseSine());
    }
  }, {
    key: "cos",
    value: function cos() {
      return new this.constructor(this.decimal.cosine());
    }
  }, {
    key: "acos",
    value: function acos() {
      return new this.constructor(this.decimal.inverseCosine());
    }
  }, {
    key: "tan",
    value: function tan() {
      return new this.constructor(this.decimal.tangent());
    }
  }, {
    key: "atan",
    value: function atan() {
      return new this.constructor(this.decimal.inverseTangent());
    } // Primitive Methods

  }, {
    key: "isFinite",
    value: function isFinite() {
      return this.decimal.isFinite();
    }
  }, {
    key: "isInt",
    value: function isInt() {
      return this.decimal.isInteger();
    }
  }, {
    key: "isNaN",
    value: function isNaN() {
      return this.decimal.isNaN();
    }
  }, {
    key: "toBinary",
    value: function toBinary(sd, rm) {
      return this.decimal.toBinary(sd, rm);
    }
  }, {
    key: "toOctal",
    value: function toOctal(sd, rm) {
      return this.decimal.toOctal(sd, rm);
    }
  }, {
    key: "toHex",
    value: function toHex(sd, rm) {
      return this.decimal.toHexadecimal(sd, rm);
    }
  }, {
    key: "toDecimal",
    value: function toDecimal() {
      return new Decimal(this.toString());
    }
  }], [{
    key: "toDecimalJs",
    value: function toDecimalJs(decimal) {
      if (decimal instanceof this) {
        return new _decimal.default(decimal.toString());
      } else if (decimal instanceof _DecimalSimple2.DecimalSimple) {
        return new _decimal.default(decimal.toString());
      } else if (decimal instanceof _decimal.default) {
        return decimal;
      } else {
        return new _decimal.default(decimal);
      }
    }
  }, {
    key: "sin",
    value: function sin(x) {
      return new this(x).sin();
    }
  }, {
    key: "cos",
    value: function cos(x) {
      return new this(x).cos();
    }
  }, {
    key: "tan",
    value: function tan(x) {
      return new this(x).tan();
    }
  }, {
    key: "asin",
    value: function asin(x) {
      return new this(x).asin();
    }
  }, {
    key: "acos",
    value: function acos(x) {
      return new this(x).acos();
    }
  }, {
    key: "atan",
    value: function atan(x) {
      return new this(x).atan();
    }
  }, {
    key: "random",
    value: function random(dp) {
      return new this(_decimal.default.random(dp));
    }
  }, {
    key: "Pi",
    get: function get() {
      return new this(-1).acos();
    }
  }]);
  return Decimal;
}(_DecimalSimple2.DecimalSimple);

exports.Decimal = Decimal;
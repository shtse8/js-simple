"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTime = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _DateTimeSimple2 = require("./DateTimeSimple");

var DateTime =
/*#__PURE__*/
function (_DateTimeSimple) {
  (0, _inherits2.default)(DateTime, _DateTimeSimple);

  function DateTime() {
    (0, _classCallCheck2.default)(this, DateTime);
    return (0, _possibleConstructorReturn2.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf.default)(DateTime)).apply(this, arguments));
  }

  (0, _createClass2.default)(DateTime, [{
    key: "setTimezone",
    value: function setTimezone(timezone) {
      this.moment.tz(timezone);
      return this;
    }
  }], [{
    key: "guessTimezone",
    value: function guessTimezone() {
      return _momentTimezone.default.tz.guess();
    }
  }, {
    key: "timezones",
    get: function get() {
      return _momentTimezone.default.tz.names();
    }
  }]);
  return DateTime;
}(_DateTimeSimple2.DateTimeSimple);

exports.DateTime = DateTime;
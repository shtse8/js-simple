"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTime = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var _Duration = require("./Duration");

var DateTime =
/*#__PURE__*/
function () {
  function DateTime(time) {
    (0, _classCallCheck2.default)(this, DateTime);
    this.moment = this.newMoment(time);
    this.format = 'YYYY-MM-DD HH:mm:ss';
  }

  (0, _createClass2.default)(DateTime, [{
    key: "newMoment",
    value: function newMoment(time) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var momentObj = null;

      if (format) {
        momentObj = (0, _moment.default)(time, format);
      } else if (typeof time === 'string') {
        momentObj = (0, _moment.default)(time);
      } else if (typeof time === 'number') {
        momentObj = _moment.default.unix(time);
      } else if (time instanceof Array) {
        // Note: Because this mirrors the native Date parameters, months, hours, minutes, seconds, and milliseconds are all zero indexed. Years and days of the month are 1 indexed.
        // Note that like moment(Array) and new Date(year, month, date), months are 0 indexed.
        var object = {
          years: time[0],
          months: time[1] - 1,
          days: time[2],
          hours: time[3],
          minutes: time[4],
          seconds: time[5],
          milliseconds: time[6]
        };
        momentObj = (0, _moment.default)(object);
      } else if (_moment.default.isMoment(time)) {
        momentObj = time.clone();
      } else if (time instanceof Date) {
        momentObj = (0, _moment.default)(time);
      } else if (time instanceof this.constructor) {
        momentObj = time.toMoment();
      } else {
        momentObj = (0, _moment.default)();
      }

      return momentObj.utc(); // UTC is our default
    }
  }, {
    key: "isSame",
    value: function isSame(dateTime) {
      return this.moment.isSame(dateTime.toMoment());
    } // Configs - return this

  }, {
    key: "setTimeZoneOffset",
    value: function setTimeZoneOffset() {
      var timeZoneOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.moment.utcOffset(timeZoneOffset);
      return this;
    } // Manipulations - return new this

  }, {
    key: "add",
    value: function add(time) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
      var duration = new _Duration.Duration(time, unit);
      var newMoment = this.moment.clone().add(duration.toMomentDuration());
      return new this.constructor(newMoment);
    }
  }, {
    key: "subtract",
    value: function subtract(time) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
      var duration = new _Duration.Duration(time, unit);
      var newMoment = this.moment.clone().subtract(duration.toMomentDuration());
      return new this.constructor(newMoment);
    } // Comparsions - return boolean

  }, {
    key: "isBefore",
    value: function isBefore(time) {
      var targetMoment = this.newMoment(time);
      return this.moment.isBefore(targetMoment);
    }
  }, {
    key: "isAfter",
    value: function isAfter(time) {
      var targetMoment = this.newMoment(time);
      return this.moment.isAfter(targetMoment);
    } // Formatters - return string

  }, {
    key: "toMysqlFormat",
    value: function toMysqlFormat() {
      return this.moment.format('YYYY-MM-DD HH:mm:ss');
    }
  }, {
    key: "toTimestamp",
    value: function toTimestamp() {
      return this.moment.unix();
    }
  }, {
    key: "toMoment",
    value: function toMoment() {
      return this.moment.clone();
    }
  }, {
    key: "toString",
    value: function toString() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return this.moment.format(format || this.format);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.constructor.name + '<' + this.toString() + '>';
    } // Durations - return duration in requested unit based
    // if you want to get correct year, please use year here
    // if you want to get correct seconds, please use seconds here
    // let currentTime = new DateTime([2015,1,23])
    // let addDuration = new Duration(3, 'months')
    // let entryTime = currentTime.add(addDuration)
    // let diffDuration = entryTime.diff(currentTime)
    // console.log('month: ', diffDuration.toMonth())
    // console.log('seconds: ', diffDuration.toSecond())

  }, {
    key: "diff",
    value: function diff(time) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'second';
      var targetMoment = this.newMoment(time);
      var diff = this.moment.diff(targetMoment, unit, true);
      return new _Duration.Duration(diff, unit);
    }
  }], [{
    key: "microtime",
    value: function microtime() {
      return (0, _moment.default)() / 1000;
    }
  }]);
  return DateTime;
}();

exports.DateTime = DateTime;
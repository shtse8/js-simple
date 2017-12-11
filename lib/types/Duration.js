"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Duration = void 0;

var _parseFloat = _interopRequireDefault(require("@babel/runtime/core-js/number/parse-float"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

// Note:
// Duration is second-based class
// The length of a duration in weeks is defined as 7 days.
// The length of a duration in months is defined as 30 days.
// The length of a duration in years is defined as 365 days.
var Duration =
/*#__PURE__*/
function () {
  function Duration(time) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
    (0, _classCallCheck2.default)(this, Duration);
    this.duration = this.newMomentDuration(time, unit);
  }

  (0, _createClass2.default)(Duration, [{
    key: "newMomentDuration",
    value: function newMomentDuration(time, unit) {
      var momentDuration = null;

      if (_moment.default.isDuration(time)) {
        momentDuration = time.clone();
      } else if (time instanceof this.constructor) {
        momentDuration = time.toMomentDuration();
      } else {
        time = (0, _parseFloat.default)(time);
        momentDuration = _moment.default.duration(time, unit);
      }

      return momentDuration;
    }
  }, {
    key: "subtract",
    value: function subtract(time) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
      var timeDuration = new this.constructor(time, unit);
      var momentDuration = this.duration.clone().subtract(timeDuration.toMomentDuration());
      return new this.constructor(momentDuration);
    }
  }, {
    key: "add",
    value: function add(time) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seconds';
      var timeDuration = new this.constructor(time, unit);
      var momentDuration = this.duration.clone().add(timeDuration.toMomentDuration());
      return new this.constructor(momentDuration);
    }
  }, {
    key: "gt",
    value: function gt(duration) {
      return this.subtract(duration).toSecond() > 0;
    }
  }, {
    key: "gte",
    value: function gte(duration) {
      return this.subtract(duration).toSecond() >= 0;
    }
  }, {
    key: "lt",
    value: function lt(duration) {
      return this.subtract(duration).toSecond() < 0;
    }
  }, {
    key: "lte",
    value: function lte(duration) {
      return this.subtract(duration).toSecond() <= 0;
    }
  }, {
    key: "toMomentDuration",
    value: function toMomentDuration() {
      return this.duration.clone();
    }
  }, {
    key: "toHumanFormat",
    value: function toHumanFormat() {
      var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
      return this.duration.clone().locale(locale).humanize(true);
    }
  }, {
    key: "toSecond",
    value: function toSecond() {
      return this.duration.clone().asSeconds();
    }
  }, {
    key: "toHour",
    value: function toHour() {
      return this.duration.clone().asHours();
    }
  }, {
    key: "toDay",
    value: function toDay() {
      return this.duration.clone().asDays();
    }
  }, {
    key: "toWeek",
    value: function toWeek() {
      return this.duration.clone().asWeeks();
    }
  }, {
    key: "toMonth",
    value: function toMonth() {
      return this.duration.clone().asMonths();
    }
  }, {
    key: "toYear",
    value: function toYear() {
      return this.duration.clone().asYears();
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.toSecond();
    }
  }]);
  return Duration;
}();

exports.Duration = Duration;
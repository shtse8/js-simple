"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var NS_PER_SEC = 1e9;

var Timer =
/*#__PURE__*/
function () {
  function Timer() {
    (0, _classCallCheck2.default)(this, Timer);
    this.start();
  }

  (0, _createClass2.default)(Timer, [{
    key: "start",
    value: function start() {
      this.startedAt = process.hrtime();
      this.stoppedAt = null;
      this.time = null;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stoppedAt = process.hrtime();
      var startedAt = this.constructor.processTuple(this.startedAt);
      var stoppedAt = this.constructor.processTuple(this.stoppedAt);
      this.time = stoppedAt - startedAt;
      return this.time;
    }
  }, {
    key: "get",
    value: function get() {
      return this.time;
    }
  }], [{
    key: "processTuple",
    value: function processTuple(tuple) {
      return tuple[0] + tuple[1] / NS_PER_SEC;
    }
  }, {
    key: "get",
    value: function get() {
      return this.processTuple(process.hrtime());
    }
  }]);
  return Timer;
}();

exports.Timer = Timer;
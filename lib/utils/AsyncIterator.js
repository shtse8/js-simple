"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncIterator = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ = require("./");

var _iterall = require("iterall");

var _events = _interopRequireDefault(require("events"));

var AsyncIterator =
/*#__PURE__*/
function () {
  function AsyncIterator() {
    (0, _classCallCheck2.default)(this, AsyncIterator);
    this.eventEmitter = new _events.default();
    this.buffer = [];
    this.counter = 0;
  }

  (0, _createClass2.default)(AsyncIterator, [{
    key: "push",
    value: function push(value) {
      this.buffer.push(value);
      this.eventEmitter.emit('push', value);
    }
  }, {
    key: "getValueFromBuffer",
    value: function getValueFromBuffer() {
      var _this = this;

      return new _promise.default(function (resolve, reject) {
        if (_this.buffer.length > 0) {
          resolve(_this.buffer.shift());
        } else {
          _this.eventEmitter.once('push', function () {
            resolve(_this.getValueFromBuffer());
          });
        }
      });
    }
  }, {
    key: "next",
    value: function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var value;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.eventEmitter.emit(this.counter > 0 ? 'next' : 'begin');
                _context.next = 3;
                return this.getValueFromBuffer();

              case 3:
                value = _context.sent;
                ++this.counter;
                return _context.abrupt("return", {
                  value: value,
                  done: false
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function next() {
        return _ref.apply(this, arguments);
      }

      return next;
    }()
  }, {
    key: "return",
    value: function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.eventEmitter.emit('return');
                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _return() {
        return _ref2.apply(this, arguments);
      }

      return _return;
    }()
  }, {
    key: "throw",
    value: function _throw(error) {
      this.eventEmitter.emit('throw');
      console.log('throw() is called. arguments:', arguments);
      return error;
    }
  }, {
    key: "once",
    value: function once(eventName, callback) {
      var _this2 = this;

      this.eventEmitter.once(eventName, callback);
      return new _.Listener(function () {
        return _this2.eventEmitter.removeListener(eventName, callback);
      });
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      var _this3 = this;

      this.eventEmitter.on(eventName, callback);
      return new _.Listener(function () {
        return _this3.eventEmitter.removeListener(eventName, callback);
      });
    }
  }, {
    key: _iterall.$$asyncIterator,
    value: function value() {
      return this;
    }
  }]);
  return AsyncIterator;
}();

exports.AsyncIterator = AsyncIterator;
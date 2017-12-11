"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listener = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lodash = _interopRequireDefault(require("lodash"));

var Listener =
/*#__PURE__*/
function () {
  function Listener(stopCallback) {
    (0, _classCallCheck2.default)(this, Listener);

    if (!_lodash.default.isFunction(stopCallback)) {
      throw new Error('Stop callback must be a function, but got: ' + (0, _typeof2.default)(stopCallback));
    }

    this.stopCallback = stopCallback;
  }

  (0, _createClass2.default)(Listener, [{
    key: "stop",
    value: function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.stopCallback) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Listener is stopped already.');

              case 2:
                _context.next = 4;
                return this.stopCallback();

              case 4:
                result = _context.sent;
                this.stopCallback = null;
                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function stop() {
        return _ref.apply(this, arguments);
      }

      return stop;
    }()
  }], [{
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var listener = setTimeout.apply(void 0, arguments);
      return new this(function () {
        return clearTimeout(listener);
      });
    })
  }, {
    key: "setInterval",
    value: function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function () {
      var listener = setInterval.apply(void 0, arguments);
      return new this(function () {
        return clearInterval(listener);
      });
    })
  }]);
  return Listener;
}();

exports.Listener = Listener;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Deferred =
/*#__PURE__*/
function () {
  function Deferred() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Deferred);
    this.promise = new _promise.default(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    this.state = 'pending';
  }

  (0, _createClass2.default)(Deferred, [{
    key: "resolve",
    value: function resolve(result) {
      this.state = 'resolved';

      this._resolve(result);
    }
  }, {
    key: "reject",
    value: function reject(error) {
      this.state = 'rejected';

      this._reject(error);
    }
  }]);
  return Deferred;
}();

exports.Deferred = Deferred;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IP = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ipAddress = require("ip-address");

var IP =
/*#__PURE__*/
function () {
  function IP(ip) {
    (0, _classCallCheck2.default)(this, IP);

    if (ip instanceof Buffer) {
      this.address6 = _ipAddress.Address6.fromUnsignedByteArray((0, _toConsumableArray2.default)(ip));
    } else if (ip instanceof this.constructor) {
      this.address6 = new _ipAddress.Address6(ip.to6());
    } else if (typeof ip === 'string') {
      /* Check and create address6 object correctly */
      this.address6 = new _ipAddress.Address6(ip);

      if (!this.address6.isValid() && this.address6.v4) {
        this.address6 = _ipAddress.Address6.fromAddress4(ip);
      }
    } else {
      throw new Error('Only support String and Buffer.');
    }

    if (!this.address6.isValid()) {
      throw new Error('the input is not a valid ip address.');
    }
  }

  (0, _createClass2.default)(IP, [{
    key: "isSame",
    value: function isSame(ip) {
      return this.toString() === ip.toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.to6();
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: "to6",
    value: function to6() {
      return this.address6.to4in6();
    }
  }, {
    key: "toByteArray",
    value: function toByteArray() {
      return this.address6.toByteArray();
    }
  }, {
    key: "toUnsignedByteArray",
    value: function toUnsignedByteArray() {
      return this.address6.toUnsignedByteArray();
    }
  }, {
    key: "toBuffer",
    value: function toBuffer() {
      var size = 16;
      var buffer = Buffer.alloc(size);
      var byteArray = this.toUnsignedByteArray();
      var offset = size - byteArray.length;

      for (var i = 0; i < byteArray.length; i++) {
        buffer.writeUInt8(byteArray[i], offset + i);
      }

      return buffer;
    } // Todo

  }, {
    key: "getCountry",
    value: function getCountry() {} // Todo

  }, {
    key: "getCity",
    value: function getCity() {}
  }]);
  return IP;
}();

exports.IP = IP;
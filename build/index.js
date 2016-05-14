'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientRenderer = exports.serverRenderer = undefined;

var _server = require('./renderer/server');

var _server2 = _interopRequireDefault(_server);

var _client = require('./renderer/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.serverRenderer = _server2.default;
exports.clientRenderer = _client2.default;
//# sourceMappingURL=index.js.map
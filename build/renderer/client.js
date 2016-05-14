'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (App, next) {

  var promises = [];

  // Set the body to be wrapped
  var Body = App || _react2.default.createElement(
    'div',
    null,
    'App Missing'
  );

  // Send our promises reference through the context
  Body = _react2.default.createElement(
    _components.Promises,
    { promises: promises },
    Body
  );

  _reactDom2.default.render(Body, document.getElementById('content'), next);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/**
/* Render a universal App on the client
/* @ App - the root React element.
/* @ next - callback from ReactDOM.render
/*/
//# sourceMappingURL=client.js.map
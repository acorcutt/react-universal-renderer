'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (App, states, script, next) {

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

  // This initial render will grab all the promises we need from any initial async calls
  _server2.default.renderToString(Body);

  // We then need to wait for all promises to finish and re-render with the state it generated!
  Promise.all(promises).then(function () {
    // Re-render the body with the new state
    var body = _server2.default.renderToString(Body);

    // Get the current head
    var head = _reactHelmet2.default.rewind();

    // And by magic the re-render of the body should have the store pre-loaded with the results from the promises!
    var html = _react2.default.createElement(Html, { body: body, head: head, states: states, script: script });

    // Render html
    var markup = '<!doctype html>\n' + _server2.default.renderToStaticMarkup(html);

    // Call the callback
    if (next) {
      next(null, markup, head);
    }
  }).catch(function (err) {
    next(err);
  });
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
/* Render a universal App on the server
/* @ App - the root React element.
/* @ state - object of {key:fn} states to load into window[key] = fn() 
/* @ script - location of script file
/* @ next - callback from ReactDOM.render
/*/


/**
 * Wrapper component for generating server response
 * @ body - body string to render
 * @ head - Helmet head components
 * @ state - state to serialize and sync for client side render
 * @ script - the react app script to place after the body tag
 */

var Html = function (_Component) {
  _inherits(Html, _Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Html).apply(this, arguments));
  }

  _createClass(Html, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var body = _props.body;
      var states = _props.states;
      var script = _props.script;
      var head = _props.head;

      var attrs = head.htmlAttributes.toComponent();
      var clientScript = script ? _react2.default.createElement('script', { src: script, type: 'text/javascript', defer: true, charSet: 'UTF-8' }) : null;

      return _react2.default.createElement(
        'html',
        attrs,
        _react2.default.createElement(
          'head',
          null,
          head.base.toComponent(),
          head.title.toComponent(),
          head.meta.toComponent(),
          head.link.toComponent(),
          head.script.toComponent(),
          head.style.toComponent()
        ),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement('div', { id: 'content', dangerouslySetInnerHTML: {
              __html: body
            } }),
          Object.keys(states).map(function (key) {
            return _react2.default.createElement('script', { key: key, dangerouslySetInnerHTML: {
                __html: 'window["' + key + '"]=' + JSON.stringify(states[key]()) + ';'
              }, charSet: 'UTF-8' });
          }),
          clientScript
        )
      );
    }
  }]);

  return Html;
}(_react.Component);

Html.propTypes = {
  body: _react.PropTypes.string,
  head: _react.PropTypes.object,
  states: _react.PropTypes.object,
  script: _react.PropTypes.string
};
//# sourceMappingURL=server.js.map
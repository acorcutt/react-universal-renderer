'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promises = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper to pass a list of promises through context to be appended to by children when making an async request
 * @promises - reference to an array that will be filled with promises after render.
 */

var Promises = exports.Promises = function (_Component) {
  _inherits(Promises, _Component);

  function Promises() {
    _classCallCheck(this, Promises);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Promises).apply(this, arguments));
  }

  _createClass(Promises, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        promises: this.props.promises
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Promises;
}(_react.Component);

Promises.propTypes = {
  children: _react.PropTypes.element.isRequired,
  promises: _react.PropTypes.array.isRequired
};
Promises.childContextTypes = {
  promises: _react.PropTypes.array
};
//# sourceMappingURL=components.js.map
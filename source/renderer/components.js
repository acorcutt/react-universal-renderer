import React, { Component, PropTypes } from 'react';

/**
 * Wrapper to pass a list of promises through context to be appended to by children when making an async request
 * @promises - reference to an array that will be filled with promises after render.
 */
export class Promises extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    promises: PropTypes.array.isRequired
  };

  static childContextTypes = {
    promises: PropTypes.array
  };

  getChildContext() {
    return {
      promises: this.props.promises
    };
  }

  render() {
    return this.props.children;
  }
}
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Store, Promises } from './components';

/**
/* Render a universal App on the server
/* @ App - the root React element.
/* @ state - object of {key:fn} states to load into window[key] = fn() 
/* @ script - location of script file
/* @ next - callback from ReactDOM.render
/*/
export default function(App, states, script, next) {

  let promises = [];

  // Set the body to be wrapped
  let Body = App || <div>App Missing</div>;

  // Send our promises reference through the context
  Body = <Promises promises={promises}>{Body}</Promises>;

  // This initial render will grab all the promises we need from any initial async calls
  ReactDOM.renderToString(Body);

  // We then need to wait for all promises to finish and re-render with the state it generated!
  Promise.all(promises).then(() => {
    // Re-render the body with the new state
    const body = ReactDOM.renderToString(Body);

    // Get the current head
    const head = Helmet.rewind();

    // And by magic the re-render of the body should have the store pre-loaded with the results from the promises!
    let html = <Html body={body} head={head} states={states} script={script} />;

    // Render html
    let markup = '<!doctype html>\n' + ReactDOM.renderToStaticMarkup(html);

    // Call the callback
    if (next) {
      next(null, markup, head);
    }
  }).catch((err) => {
    next(err);
  });
}

/**
 * Wrapper component for generating server response
 * @ body - body string to render
 * @ head - Helmet head components
 * @ state - state to serialize and sync for client side render
 * @ script - the react app script to place after the body tag
 */
class Html extends Component {
  static propTypes = {
    body: PropTypes.string,
    head: PropTypes.object,
    states: PropTypes.object,
    script: PropTypes.string,
  };

  render() {
    const {body, states, script, head} = this.props;
    const attrs = head.htmlAttributes.toComponent();
    const clientScript = script ? <script src={script} type="text/javascript" defer charSet="UTF-8" /> : null;
    
    return (
      <html {...attrs}>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {head.style.toComponent()}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{
        __html: body
      }}/>          
          {Object.keys(states).map((key) => <script key={key} dangerouslySetInnerHTML={{
          __html: `window["${key}"]=${JSON.stringify(states[key]())};`
        }} charSet="UTF-8"/>)}
          {clientScript}
        </body>
      </html>
      );
  }
}
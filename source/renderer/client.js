import React from 'react';
import ReactDOM from 'react-dom';
import { Promises } from './components';

/**
/* Render a universal App on the client
/* @ App - the root React element.
/* @ next - callback from ReactDOM.render
/*/
export default function(App, next) {

  let promises = [];

  // Set the body to be wrapped
  let Body = App || <div>App Missing</div>;

  // Send our promises reference through the context
  Body = <Promises promises={promises}>{Body}</Promises>;

  ReactDOM.render(Body, document.getElementById('content'), next);

};









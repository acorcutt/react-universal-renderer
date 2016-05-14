# React Universal Renderer

Helper for rendering a universal React app on the client & server. This wraps a React App inside a container for passing promises back through the context which the server renderer will then wait for before rendering the initial view, keeping the initial render on the client & server data in sync.

## How It Works

We make two passes when rendering on the server, on the first pass we push any asynchronous request promises onto a stack passed through the context, we then wait for the promises to complete and update any saved state or stores. Then we re-render with this new state and pass it to the client.

## RoadMap

- A better example with routing etc.
- Add class decorator / connector to access promises.
- Supprt React Native

## Examples

### [React Universal Renderer Example](https://github.com/acorcutt/react-universal-renderer-example)

Simple example to do an async request on the server and render the result. We use freezer.js as the store, anything will work just tell the server renderer how to serialize it for the client.


## Usage

###  serverRenderer(App,states,script,callback)
```
let store = {};

serverRenderer(<App store={store} />, {__STORE: store, '/scripts/client.js', (err, html) => {
    if (err) {
      return next(err);
    }

    res.send(html);
  });
```

### clientRenderer(App)
```
let store = window.__STORE;

clientRenderer(<App store={store} />);

```

### App
```
// Use componentWillMount to execute on the client and server
componentWillMount (){
	
	// Only fetch if we have not got state (we will have state on the second render pass and the initial client request)
	if(!store.message){
		// Push a promise onto stack to wait for on second render pass...
		this.context.promises.push(fetch('http://localhost:8080/message').then((response) => {
			// Update state
			store.message = response.message;

		});
	}
}      
```
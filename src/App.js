import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import _ from 'underscore'
import Global from './components/Global'
import rootReducer from './store/reducer'
import {toast, confirm} from './actions/global'
import Login from './components/Login'
import Main from './components/Main'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  if (module.hot) {
    // inferno dev tools 会影响到函数组件的属性生命周期函数执行
    // require('inferno-devtools')
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(/*'rdc/customerIndex', () => {
      const nextRootReducer = require('rdc/customerIndex')
      store.replaceReducer(nextRootReducer)
    }*/)
  }

  return store
}

let initialState = { }
const store = configureStore(initialState)

window.XK_MESSAGER = {
  toast(...args){
    store.dispatch(toast(...args))
  },
  error(...args){
    store.dispatch(toast(...args, 'err'))
  },
  success(...args){
    store.dispatch(toast(...args, 'ok'))
  },
  warn(...args){
    store.dispatch(toast(...args, 'warn'))
  },
  alert(text, onOk){
    store.dispatch(confirm({type: 'alert', text, onOk}))
  },
  confirm(text, onOk, onCancel){
    const params = _.isObject(text) ? text : {text, onOk, onCancel}
    store.dispatch(confirm(params))
  },
  prompt(text, onOk){
    store.dispatch(confirm({type: 'prompt', text, onOk}))
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          {this.renderApp()}
          <Global/>
        </div>
      </Provider>
    );
  }

  renderApp(){
    if(this.props.logged===null) return null
    if(!this.props.logged) return <Login/>
    return this.renderRouter()

  }
  renderRouter(){
    return <BrowserRouter>
      <React.Fragment>
        <Main />
      </React.Fragment>
    </BrowserRouter>
  }

}
export default App;
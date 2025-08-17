import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterReducer from './reducer'
import Unicafe from './components/Unicafe'

const store = createStore(counterReducer)

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Unicafe</h1>
        <Unicafe />
      </div>
    </Provider>
  )
}

export default App

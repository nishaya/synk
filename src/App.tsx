import { Keyboard } from 'Components/Keyboard'
import SessionContainer from 'Containers/Session'
import * as React from 'react'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SessionContainer />
        <Keyboard />
      </div>
    )
  }
}

export default App

import { Keyboard } from 'Components/Keyboard'
import Mock from 'Components/Mock'
import * as React from 'react'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Mock />
        <Keyboard />
      </div>
    )
  }
}

export default App

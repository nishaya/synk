import * as React from 'react'
import './App.css'
import Mock from 'Components/Mock'
import Stats from 'Components/Stats'
import { Keyboard } from 'Components/Keyboard'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Mock />
        <Stats />
        <Keyboard />
      </div>
    )
  }
}

export default App

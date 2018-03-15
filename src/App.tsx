import * as React from 'react'
import './App.css'
import Mock from 'Components/Mock'
import Stats from 'Components/Stats'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Mock />
        <Stats />
      </div>
    )
  }
}

export default App

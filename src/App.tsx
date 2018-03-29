import TitleBar from 'Components/Common/TitleBar'
import ComputerKeysComponent from 'Containers/ComputerKeys'
import SessionContainer from 'Containers/Session'
import * as React from 'react'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <ComputerKeysComponent />
        <SessionContainer />
      </div>
    )
  }
}

export default App

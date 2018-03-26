import * as React from 'react'

interface Props {}

class ComputerKeysComponent extends React.Component<Props> {
  keyDownHandler: (e: KeyboardEvent) => void
  keyUpHandler: (e: KeyboardEvent) => void

  handleKeyDown(e: KeyboardEvent): void {
    console.log('keydown', e)
  }

  handleKeyUp(e: KeyboardEvent): void {
    console.log('keyup', e)
  }

  componentDidMount() {
    this.keyDownHandler = this.handleKeyDown.bind(this)
    this.keyUpHandler = this.handleKeyUp.bind(this)
    document.addEventListener('keydown', this.keyDownHandler)
    document.addEventListener('keyup', this.keyUpHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler)
    document.removeEventListener('keyup', this.keyUpHandler)
  }

  render() {
    return null
  }
}

export default ComputerKeysComponent

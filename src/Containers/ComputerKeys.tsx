import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { RootState } from 'Redux/store'
import { keyDown, keyUp } from 'Redux/UI'

interface Props {
  keyDown: (key: string) => void
  keyUp: (key: string) => void
}

class ComputerKeysComponent extends React.Component<Props> {
  keyDownHandler: (e: KeyboardEvent) => void
  keyUpHandler: (e: KeyboardEvent) => void

  handleKeyDown(e: KeyboardEvent): void {
    console.log('keydown', e)
    this.props.keyDown(e.key)
  }

  handleKeyUp(e: KeyboardEvent): void {
    console.log('keyup', e)
    this.props.keyUp(e.key)
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

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  keyDown: (key: string) => {
    dispatch(keyDown({ key }))
  },
  keyUp: (key: string) => {
    dispatch(keyUp({ key }))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(
  ComputerKeysComponent
)

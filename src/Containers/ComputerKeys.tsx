import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Action } from 'redux'
import { RootState } from 'Redux/store'
import { keyDown, keyUp } from 'Redux/UI'

interface Props {
  keyDown: (key: string) => void
  keyUp: (key: string) => void
  keyPressed: (key: string) => boolean
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
    // const { keyPressed } = this.props
    // return <div>{keyPressed('a') ? 'A' : '-'}</div>
  }
}

const mapStateToProps = (state: RootState) => ({
  keyPressed: (key: string): boolean => {
    const { keys } = state.UI
    return keys.get(key) ? true : false
  }
})

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

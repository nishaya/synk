import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { sessionReducers as Session, SessionState } from 'Redux/Session'
import { synthReducers as Synth, SynthState } from 'Redux/Synth'
import { uiReducers as UI, UIState } from 'Redux/UI'
import { isDevelopment } from 'Utils/env'

const reducers = combineReducers({
  Session,
  Synth,
  UI
})

const middlewares = []
let composeEnhancers = compose
if (isDevelopment()) {
  // redux-logger
  const logger = createLogger()
  middlewares.push(logger)

  // redux-devtool
  if (
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
  }
}
const enhancer = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(reducers, enhancer)

export default store

export type RootState = {
  Session: SessionState
  UI: UIState
  Synth: SynthState
}

import React from 'react'
import { Provider } from 'react-redux'
import rootReducer from './reducer'

const ReduxStore = ({children}) => {
  return (
    <Provider store={rootReducer}>{children}</Provider>
  )
}

export default ReduxStore
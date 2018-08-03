import {combineReducers,createStore} from 'redux'
import reducer from './reducer'
import authZero from './authZero'

const rootReducer = combineReducers({reducer, authZero})

export default createStore(rootReducer)
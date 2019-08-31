import { combineReducers } from 'redux'
import { login, loadingBar } from './reducer'

export default combineReducers({user: login, loadingBar })
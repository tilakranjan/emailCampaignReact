import { combineReducers } from 'redux'
import { AddReducer, CheckReducer} from './campaign/campaign.reducer'
const rootReducer = combineReducers({
addEc : AddReducer,
checkEc: CheckReducer
})

export default rootReducer
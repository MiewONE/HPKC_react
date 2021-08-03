import { combineReducers } from 'redux';
import user from './modules/user';
import vote from './modules/vote';
import team from './modules/team';
export default combineReducers({
    user,
    vote,
    team,
});

import { combineReducers } from 'redux';
import user from './modules/user';
import vote from './modules/vote';
import team from './modules/team';
import presentation from './modules/presentation';
export default combineReducers({
    user,
    vote,
    team,
    presentation,
});

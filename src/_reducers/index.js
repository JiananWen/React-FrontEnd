import { combineReducers } from 'redux';

import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { project} from './project.reducer';
import { table} from './table.reducer';

const rootReducer = combineReducers({
    users,
    alert,
    project,
    table
});

export default rootReducer;
import { tableConstants } from '../_constans/table.constants';

export function table(state = {}, action) {
    switch (action.type) {
        case tableConstants.ADD_TABLE_WIDTH:
            return {
                tableWidth: action.width,
            }
        case tableConstants.CHANGE_TABLE_WIDTH:
            return {
                tableWidth: action.width,
            }
        default:
            return state;
    }
}
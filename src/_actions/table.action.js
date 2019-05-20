import { tableConstants } from '../_constans/table.constants';

export const tableActions = {
    addTableWidth,
    changeTableWidth,
}

function addTableWidth(width) {
    return {
        type: tableConstants.ADD_TABLE_WIDTH,
        width
    };
}

function changeTableWidth(width){
    return {
        type: tableConstants.CHANGE_TABLE_WIDTH,
        width
    }
}
import { projectConstants } from '../_constans/project.constants';

export const projectActions = {
    addProject,
    changeProject,
    clearProject,
    sendChoosenRows
}


function addProject(projectInfo) {
    return {
        type: projectConstants.ADD_PROJECT,
        projectInfo
    };
}


function changeProject(projectInfo) {
    return {
        type: projectConstants.CHANGE_PROJECT,
        projectInfo
    }
}

function clearProject(){
    return {
        type: projectConstants.CLEAR_PROJECT
    }
}

function sendChoosenRows(projectInfo, headers, rows, ttMap, TitleAndTitleIdMap){
    return {
        type: projectConstants.SEND_CHOOSEN_ROWS,
        projectInfo,
        headers,
        rows,
        ttMap,
        TitleAndTitleIdMap,
    }
}
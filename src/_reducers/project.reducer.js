import { projectConstants } from "../_constans/project.constants";

export function project(state = {}, action) {
    switch (action.type) {
        case projectConstants.CHANGE_PROJECT:
            return {
                projectId: action.projectInfo.projectId,
                projectName: action.projectInfo.projectName
            }
        case projectConstants.ADD_PROJECT:
            return {
                projectId: action.projectInfo.projectId,
                projectName: action.projectInfo.projectName
            }
        case projectConstants.CLEAR_PROJECT:
            return { }
        case projectConstants.SEND_CHOOSEN_ROWS:
            return {
                projectId: action.projectInfo.projectId,
                projectName: action.projectInfo.projectName,
                choosenHeaders: action.headers,
                choosenRows: action.rows,
                ttMap: action.ttMap,
                TitleAndTitleIdMap: action.TitleAndTitleIdMap,
            }
        default:
            return state;
    }
}
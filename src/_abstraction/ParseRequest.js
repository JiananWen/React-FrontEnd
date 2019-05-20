export const ParseRequest = {
    parseUpdateProject,
    parseAddRow,
}


function parseUpdateProject(projectId, projectName, headers, rows, map) {

    const ris = [];

    console.log('!!!');

    const _headers = [...headers.splice(2)];
    console.log(rows);

    for (let row of rows) {
        console.log(row);
        // get each resource
        const resource = {
            resourceId: row.resourceId,
            resourceName: row.resourceName,
            resourceCode: row.resourceCode,
            projectId: projectId
        }


        // get each titleDataMap
        let titleDataMap = {};


        for (let title of _headers) {

            titleDataMap[title] = {
                dataValue: row[title],
                resourceId: row.resourceId,
                titleId: map[title],
                projectId: projectId,
            };

        }

        let ri = {
            resource: resource,
            titleDataMap: titleDataMap,
        }

        ris.push(ri);
    }

    const project = {
        projectId: projectId,
        projectName: projectName,
        ris: ris,
    };


    return project;


}



function parseAddRow(row, _projectId, headers, map) {
    const newRow = { ...row };
    // console.log('in request parse');
    // console.log(newRow);
    const _resource = {
        resourceId: null,
        resourceName: newRow.resourceName,
        resourceCode: newRow.resourceCode,
        projectId: _projectId,
    }

    const _headers = [...headers.splice(2)];

    // get each titleDataMap
    let titleDataMap = {};


    for (let title of _headers) {

        titleDataMap[title] = {
            dataValue: newRow[title],
            resourceId: null,
            titleId: map[title],
            projectId: _projectId,
        };

    }

    let ri = {
        resource: _resource,
        titleDataMap: titleDataMap,
    }

    return ri;



}


function parseAddColumn() {

}
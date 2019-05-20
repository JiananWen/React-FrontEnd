
export const parseResponse = {
    parseHeaders,
    parseRows,
    parseTitleAndTitleIdMap,
    parseTTMap,
}


function parseTitleAndTitleIdMap(project) {
    const currentProject = { ...project };

    const map = {};

    const titleDataMap = currentProject.ris[0].titleDataMap;

    const titles = Object.keys(currentProject.ris[0].titleDataMap);

    for (let title of titles) {
        map[title.split('-')[0]] = titleDataMap[title].titleId;
    }
    return map;
}

function parseHeaders(project) {
    const currentProject = { ...project };

    const headers = [];

    headers.push('resourceName');

    headers.push('resourceCode');

    const titles = Object.keys(currentProject.ris[0].titleDataMap);

    for (let title of titles) {
        headers.push(title);
    }
    // console.log('in parse headers');
    // console.log(headers);
    return headers;
}

function parseRows(project, headers, _inputType) {
    const currentProject = { ...project };
    const rows = [];


    // get additional column's name
    const titleArray = [];

    for (let title of headers) {
        if (title === 'resourceName' || title === 'resourceCode') {
            continue;
        }
        titleArray.push(title);
    }
    // console.log('in parse rows');
    

    for (let element of currentProject.ris) {
        const res = {}

        res.resourceId = element.resource.resourceId;
        res.resourceName = element.resource.resourceName;
        res.resourceCode = element.resource.resourceCode;

        // access titles and values
        for (let title of titleArray) {
            res[title] = element.titleDataMap[title].dataValue;
        }

        res.inputType = _inputType;

        rows.push(res);
    }
    // console.log(rows);
    return rows;
}

function parseTTMap(project){
    const currentProject = { ...project };

    const map = currentProject.ttMap;
    return map;

}
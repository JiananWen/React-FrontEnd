import React, { Component } from 'react';

import axios from 'axios';
import Table from '../../components/Table/Table';

import './resource.css';
import Popup from '../../components/UI/Popup/Popup';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/project.action';
import { tableActions } from '../../_actions/table.action';
import { parseResponse } from '../../_abstraction/ParseResponse';
import { ParseRequest } from '../../_abstraction/ParseRequest';


class Resource extends Component {

    state = {
        // project: {},
        headers: [],
        rows: [],
        options: [
            {
                type: 'row',
                text: 'Add Row',
            },
            {
                type: 'column',
                text: 'Add Column'
            },
            {
                type: 'csv',
                text: 'Import CSV'
            }
        ],
        showPop: false,
        goodCount: 0,
        readyToAdd: false,
        totalWidth: this.props.table.tableWidth,
    }


    componentDidMount() {
        axios.get(`/project`)
            .then(res => {
                const currentProject = { ...res.data };

                // update redux store
                const projectId = currentProject.projectId;
                const projectName = currentProject.projectName;

                this.props.dispatch(projectActions.addProject({
                    projectId: projectId,
                    projectName: projectName
                }))

                // get headers and rows from response
                const headers = parseResponse.parseHeaders(currentProject);
                const rows = parseResponse.parseRows(currentProject, headers, '');
                const TitleAndTitleIdMap = parseResponse.parseTitleAndTitleIdMap(currentProject);
                const ttMap = parseResponse.parseTTMap(currentProject);

                const _totalWidth = document.getElementById('mainBody').offsetWidth;

                this.props.dispatch(tableActions.addTableWidth(_totalWidth));

                // update state
                this.setState({
                    projectId: projectId,
                    projectName: projectName,
                    headers: headers,
                    rows: rows,
                    TitleAndTitleIdMap: TitleAndTitleIdMap,
                    totalWidth: _totalWidth,
                    ttMap: ttMap,
                });

            })
    }

    componentWillReceiveProps = () => {
        console.log('yaya');
        this.setState({
            totalWidth: this.props.table.tableWidth,
        })
    }



    clickPop = () => {

        if (this.state.showPop) {
            document.getElementById('resource_popup').style.visibility = 'hidden';
            this.setState({
                showPop: !this.state.showPop
            });
        } else {
            document.getElementById('resource_popup').style.visibility = 'visible';
            this.setState({
                showPop: !this.state.showPop
            });
        }

    }

    popRowClicked = (event, id) => {

        // add new addrow row into rows
        if (id === 0) {
            // add row
            console.log('add row');

            const newRow = {
                resourceId: null,
                resourceName: '',
                resourceCode: 0,
            }

            let _headers = [...this.state.headers];
            _headers = _headers.slice(2);

            for (let _title of _headers) {
                newRow[_title] = '';
            }

            newRow.inputType = 'addrow';

            const originalRows = [...this.state.rows];
            originalRows.push(newRow);

            this.setState({
                rows: originalRows,
                readyToAdd: false,
            });


        }


        if (id === 1) {
            // add column
            console.log('add column');

        }

        if (id === 2) {
            // import csv
            console.log('import csv');

        }


    }

    dataChanged = (event, key) => {

        // change data
        const resourceId = key[0];
        const titleName = key[1];
        // change state 


        // if resourcedId is null, add row to database and state
        if (resourceId == null) {
            console.log('time to add row');

            // get value and set statenp
            const updatedValue = event.target.value;
            let addedRow = null;

            const newRows = [...this.state.rows];
            for (let index in newRows) {
                let currentRow = newRows[index];

                if (currentRow.resourceId === resourceId) {

                    currentRow[titleName] = updatedValue;

                    addedRow = currentRow;
                }
            }

            this.setState({
                rows: newRows,
            })


            // check all info is filled

            let fullfiled = true;
            for (let part in addedRow) {
                if (part === 'resourceId') {
                    continue;
                }
                if (!addedRow[part]) {

                    fullfiled = false;
                    break;
                }
            }

            if (fullfiled) {
                this.setState({
                    readyToAdd: true
                })
            }

        }


    }


    goodClicked = (event, key) => {
        console.log('good');

        if (this.state.readyToAdd) {

            let _rows = [...this.state.rows];

            // get added new row
            let addedRow = null;
            for (let row of _rows) {
                if (row.resourceId === null) {
                    addedRow = row;
                }
            }

            // remove added new row from rows -> render the page
            const index = _rows.indexOf(addedRow);
            if (index !== -1) {
                _rows.splice(index, 1);
            }

            // prepare data to send server
            const _currentProject = { ...this.state };

            const _projectId = _currentProject.projectId;
            const _headers = [..._currentProject.headers];
            const _map = _currentProject.TitleAndTitleIdMap;


            const updateDRI = ParseRequest.parseAddRow(addedRow, _projectId, _headers, _map);

            // change added new row resourceid
            axios.post('/projects/addrow', updateDRI).then(res => {
                const ris = res.data.ris;
                console.log('-------');
                console.log(addedRow);
                ris.forEach(ri => {
                    console.log(ri);
                    if (ri.resource.resourceCode == addedRow.resourceCode) {
                        addedRow.resourceId = ri.resource.resourceId;
                        console.log('in check    ' + addedRow);
                    }
                });

                // change addedrow inputType
                addedRow.inputType = '';
                _rows.push(addedRow);

                // set state to render
                this.setState({
                    readyToAdd: false,
                    rows: _rows,
                });

                console.log(this.state);

            });



        }
    }

    cancelClicked = (event, key) => {
        console.log('cancel');
        console.log(key)

        // delete added new row from state

        let _rows = [...this.state.rows];

        // get added new row
        let addedRow = null;
        for (let row of _rows) {
            if (row.resourceId === null) {
                addedRow = row;
            }
        }

        // remove added new row from rows -> render the page
        const index = _rows.indexOf(addedRow);
        if (index !== -1) {
            _rows.splice(index, 1);
        }

        // set state
        this.setState({
            rows: _rows,
            readyToAdd: false,
        });

    }

    render() {
        return (

            <div id="OutsideTable">
                <div className='tableHead'>
                    <div>
                        <input type="text" placeholder="Keyword"></input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <div>
                        <h4>Resource Catelog</h4>
                    </div>
                    <div>
                        <button onClick={this.clickPop}><i className="fas fa-plus"></i></button>
                        <div className="popup" id="resource_popup">

                            {this.state.options.map((option, index) => {
                                return (
                                    <Popup
                                        key={index}
                                        data={option}
                                        clicked={(event) => { this.popRowClicked(event, index) }} />
                                )

                            })}

                        </div>

                    </div>
                </div>
                <Table
                    headers={this.state.headers}
                    rows={this.state.rows}
                    changed={(event, key) => { this.dataChanged(event, key) }}
                    cancelClicked={(event, key) => { this.cancelClicked(event, key) }}
                    goodClicked={(event, key) => this.goodClicked(event, key)}
                    totalWidth={this.state.totalWidth}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    
    return {
        table: state.table,
    };
}


export default connect(mapStateToProps)(Resource);
import React, { Component } from 'react';
import style from './Project.module.css';
import Popup from '../../components/UI/Popup/Popup';
import { connect } from 'react-redux';
import axios from 'axios';

import { parseResponse } from '../../_abstraction/ParseResponse';
// import { ParseRequest } from '../../_abstraction/ParseRequest';
import { projectActions } from '../../_actions/project.action';
import Table from '../../components/Table/Table';

import { history } from '../../_helper/history';





class Project extends Component {

    state = {
        options: [
            {
                type: 'select',
                text: 'Select All',
            },
            {
                type: 'clear',
                text: 'Clear Selection'
            }
        ],
        showPop: false,
        leftProject: {},
        rightProject: {
            headers: [],
            rows: [],
        },
        totalWidth: 0,
        isFetachData: false,
        projectsList: [],
    }

    componentDidMount() {
        console.log('begin did mount');

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
                console.log(headers);
                const rows = parseResponse.parseRows(currentProject, headers, 'check');
                const ttMap = parseResponse.parseTTMap(currentProject);
                const TitleAndTitleIdMap = parseResponse.parseTitleAndTitleIdMap(currentProject);

                const _totalWidth = document.getElementById('leftTable').offsetWidth;


                const leftCheckedMap = {};
                for (let row of rows) {
                    let rid = row.resourceId;
                    leftCheckedMap[rid] = false;
                }

                // // update state
                this.setState({
                    leftProject: {
                        headers: headers,
                        rows: rows,
                        TitleAndTitleIdMap: TitleAndTitleIdMap,
                        totalWidth: _totalWidth,
                    },
                    totalWidth: _totalWidth,
                    isFetachData: true,
                    rightProject: {
                        headers: headers,
                        rows: [],
                    },
                    projectId: projectId,
                    projectName: projectName,
                    leftCheckedMap: leftCheckedMap,
                    rightCheckedMap: {},
                    ttMap: ttMap,
                });



            })

        axios.get(`/projects`).then(res => {
            const projects = [...res.data];

            const projectlist = [];
            for (let project of projects) {
                const projectInfo = {
                    projectId: project.projectId,
                    projectName: project.projectName
                }
                projectlist.push(projectInfo);
            }
            this.setState({
                projectsList: projectlist,
            });
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

    clickedCheckLeft = (event, key) => {
        console.log('click checked');

        const resourceId = key[0];

        const leftCheckMap = { ...this.state.leftCheckedMap };

        leftCheckMap[resourceId] = event.target.checked;

        this.setState({
            leftCheckedMap: leftCheckMap,
        });

    }

    clickedCheckRight = (event, key) => {
        console.log('right click checked')

        const resourceId = key[0];

        const rightCheckedMap = { ...this.state.rightCheckedMap };

        rightCheckedMap[resourceId] = !rightCheckedMap[resourceId];

        this.setState({
            rightCheckedMap: rightCheckedMap,
        })

    }

    popRowClicked = (event, index) => {
        console.log('pop clicked');
        console.log(event + " " + index);

        // select all left resources
        if (index === 0) {
            document.getElementById('CELL_CHECKBOX').checked = true;
        }

        if (index === 1) {

        }
    }

    clickAdd = () => {
        console.log('add clicked');

        // add all checked resource to right table

        const leftRows = [...this.state.leftProject.rows];
        const leftCheckedMap = { ...this.state.leftCheckedMap };

        const rightRows = [];
        const rightCheckedMap = {};

        for (let leftRow of leftRows) {
            const r_id = leftRow.resourceId;
            if (leftCheckedMap[r_id]) {
                rightRows.push(leftRow);
                rightCheckedMap[r_id] = false;
            }
        }

        const rightProject = { ...this.state.rightProject };
        rightProject.rows = rightRows;

        this.setState({
            rightProject: rightProject,
            rightCheckedMap: rightCheckedMap,
        });


    }

    // right table
    removeSelected = () => {
        console.log('remove clicked');

        const rightRows = [...this.state.rightProject.rows];
        const rightCheckedMap = { ...this.state.rightCheckedMap };

        const rightNewRows = rightRows.filter((row) => {
            if (rightCheckedMap[row.resourceId]) {
                return false;
            }
            return true;
        });

        // change rightchecked map

        const rightNewCheckedMap = {};
        for (let rightRow of rightNewRows) {
            rightNewCheckedMap[rightRow.resourceId] = false;
        }

        const rightProject = { ...this.state.rightProject };
        rightProject.rows = rightNewRows;

        this.setState({
            rightProject: rightProject,
            rightCheckedMap: rightNewCheckedMap,
        })


    }

    // footer 
    toResource = () => {
        history.push('/resource');
    }

    toFormula = () => {

        // send right table headers and rows to redux

        const projectInfo = {
            projectId: this.state.projectId,
            projectName: this.state.projectName,
        };

        const headers= [...this.state.rightProject.headers];
        const rows = [...this.state.rightProject.rows];
        const ttMap = {...this.state.ttMap};
        const TitleAndTitleIdMap = {...this.state.leftProject.TitleAndTitleIdMap};

        this.props.dispatch(projectActions.sendChoosenRows(projectInfo, headers, rows, ttMap, TitleAndTitleIdMap));

        history.push('/formula');
    }

    // choose project


    chooseProject = () => {
        const projectId = document.getElementById('mySelector').value;
        
        // update page
        axios.get(`/projects/`+ projectId)
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
                const rows = parseResponse.parseRows(currentProject, headers, 'check');

                const TitleAndTitleIdMap = parseResponse.parseTitleAndTitleIdMap(currentProject);

                const _totalWidth = document.getElementById('leftTable').offsetWidth;


                const leftCheckedMap = {};
                for (let row of rows) {
                    let rid = row.resourceId;
                    leftCheckedMap[rid] = false;
                }

                // // update state
                this.setState({
                    leftProject: {
                        headers: headers,
                        rows: rows,
                        TitleAndTitleIdMap: TitleAndTitleIdMap,
                        totalWidth: _totalWidth,
                    },
                    totalWidth: _totalWidth,
                    isFetachData: true,
                    rightProject: {
                        headers: headers,
                        rows: [],
                    },
                    projectId: projectId,
                    projectName: projectName,
                    leftCheckedMap: leftCheckedMap,
                    rightCheckedMap: {},
                });

            })


    }




    render() {

        console.log(this.state);
        if (!this.state.isFetachData) {
            return (
                <div className={style.project}>
                    <div className={style.projectSelector}>
                    </div>

                    <div className={style.twoTables}>
                        <div className={style.table} id="leftTable">
                        </div>
                    </div>

                </div>
            )
        }



        return (
            <div className={style.project}>
                <div className={style.projectSelector}>
                    <div></div>
                    <select id="mySelector" className={style.selectPicker} onChange={this.chooseProject}>
                        {this.state.projectsList.map((project) => {
                            return (
                                <option key={project.projectId}
                                value={project.projectId}
                                >
                                    {project.projectName}
                                </option>
                            )
                        })}
                    </select>


                </div>

                <div className={style.twoTables}>
                    <div className={style.table} id="leftTable">
                        <div className='tableHead'>
                            <div>

                            </div>
                            <div>
                                <h4>Resource Catelog</h4>
                            </div>
                            <div>
                                <button onClick={this.clickPop} className={style.buttons}><i className="fas fa-list"></i></button>
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
                                <button onClick={this.clickAdd} className={style.buttons}><i className="fas fa-share"></i></button>

                            </div>
                        </div>

                        <Table
                            headers={this.state.leftProject.headers}
                            rows={this.state.leftProject.rows}
                            // changed={(event, key) => { this.dataChanged(event, key) }}
                            // cancelClicked={(event, key) => { this.cancelClicked(event, key) }}
                            // goodClicked={(event, key) => this.goodClicked(event, key)}
                            totalWidth={this.state.totalWidth}
                            clickedCheck={(event, key) => this.clickedCheckLeft(event, key)}
                        />

                    </div>

                    <div className={style.table}>
                        <div className='tableHead'>
                            <div>

                            </div>
                            <div>
                                <h4>Resource Catelog</h4>
                            </div>
                            <div>
                                <button onClick={this.removeSelected} className={style.buttons}><i className="fas fa-trash-alt"></i></button>

                            </div>
                        </div>
                        <Table
                            headers={this.state.rightProject.headers}
                            rows={this.state.rightProject.rows}
                            // changed={(event, key) => { this.dataChanged(event, key) }}
                            // cancelClicked={(event, key) => { this.cancelClicked(event, key) }}
                            // goodClicked={(event, key) => this.goodClicked(event, key)}
                            totalWidth={this.state.totalWidth}
                            clickedCheck={(event, key) => this.clickedCheckRight(event, key)}
                        />

                    </div>

                </div>
                <div className={style.footer}>
                    <div className={style.footerbutton} id={style.edit} onClick={this.toResource}>Edit Resource</div>
                    <div className={style.footerbutton} >
                        <button id={style.submitButton} onClick={this.toFormula}>Submit</button>
                    </div>
                </div>

            </div>

        )
    }
}



function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps)(Project);
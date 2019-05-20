import React, { Component } from 'react';
import style from './Formula.module.css';
import { connect } from 'react-redux';
import Table from '../../components/Table/Table';
// import { Table } from '../../components/Table/Table';
import { history } from '../../_helper/history';
import axios from 'axios';
import { ParseRequest } from '../../_abstraction/ParseRequest';

class Formula extends Component {

    state = {
        rows: [],
        headers: [],
        projectId: null,
        projectName: null,
        totalWidth: 0,
    }

    componentDidMount = () => {


        if (this.props.project.choosenRows) {
            const rows = [...this.props.project.choosenRows];
            // change type of rows

            for (let row of rows) {
                row.inputType = 'input';
            }

            const headers = [...this.props.project.choosenHeaders];
            const projectId = this.props.project.projectId;
            const projectName = this.props.project.projectName;
            const ttMap = { ...this.props.project.ttMap };

            const _totalWidth = document.getElementById('mainBody').offsetWidth;

            this.setState({
                rows: rows,
                headers: headers,
                projectName: projectName,
                projectId: projectId,
                totalWidth: _totalWidth,
                ttMap: ttMap,
            });
        } else {
            alert('Please Choose Entity From Project')
            history.push('/project');
        }

    }

    toTemplate = () => {
        history.push('/template');
    }

    dataChanged = (event, key) => {

        const resourceId = key[0];
        const titleName = key[1];


        const updatedValue = event.target.value;

        const newRows = [...this.state.rows];
        for (let index in newRows) {
            let currentRow = newRows[index];

            if (currentRow.resourceId === resourceId) {
                currentRow[titleName] = updatedValue;
            }
        }


        this.setState({
            rows: newRows,
        })

        // 1. update data -> without add row or column, update data accroding to the response
        // projectId, projectName, headers, rows, map

        const _currentProject = { ...this.state };

        const _projectId = _currentProject.projectId;
        const _projectName = _currentProject.projectName;
        const _headers = [..._currentProject.headers];
        const _rows = _currentProject.rows;
        const _map = {...this.props.project.TitleAndTitleIdMap};

        const updatingProject = ParseRequest.parseUpdateProject(_projectId, _projectName, _headers, _rows, _map);

        // update database
        axios.post(`/projects/update`, updatingProject);
    }

    render() {
        console.log(this.state);
        return (
            <div className={style.formula}>
                <div>
                    <div className='tableHead'>

                        <div>
                            <h4>QUANTITY SERVEY</h4>
                        </div>

                    </div>
                    <Table
                        headers={this.state.headers}
                        rows={this.state.rows}
                        changed={(event, key) => { this.dataChanged(event, key) }}
                        // cancelClicked={(event, key) => { this.cancelClicked(event, key) }}
                        // goodClicked={(event, key) => this.goodClicked(event, key)}
                        totalWidth={this.state.totalWidth}
                    // clickedCheck={(event, key) => this.clickedCheckLeft(event, key)}
                    />

                </div>

                <div className={style.footer}>
                    <div className={style.footerbutton} id={style.edit} onClick={this.toTemplate}>Edit Quantity Servey Template</div>
                    <div className={style.footerbutton} >
                        <button id={style.submitButton} onClick={this.toFormula}>Submit</button>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        project: state.project
    };
}


export default connect(mapStateToProps)(Formula);
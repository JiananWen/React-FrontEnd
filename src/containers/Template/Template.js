import React, { Component } from 'react';
import style from './Template.module.css';
import { connect } from 'react-redux';
import { history } from '../../_helper/history';
import Field from '../../components/Field/Field';
import { projectActions } from '../../_actions/project.action';

class Template extends Component {

    state = {
        headers: [],
        rows: [],
        fields: [],
        ttMap: {},
    }

    componentDidMount = () => {

        if (this.props.project.choosenHeaders) {
            const headers = [...this.props.project.choosenHeaders];
            const rows = [...this.props.project.choosenRows];
            const ttMap = {...this.props.project.ttMap};

            // change headers
            const newHeaders = [];

            headers.forEach((header) => {

                let checkedStatus = false;
                if(header === 'resourceName' || header === 'resourceCode'){
                    checkedStatus = true;
                }

                const headerInfo = {
                    value: header,
                    checked: checkedStatus,
                }
                newHeaders.push(headerInfo);
            })

            this.setState({
                headers: newHeaders,
                rows: rows,
                ttMap: ttMap,
            })
        }else{
            alert('Please Choose Entity From Project Page')
            history.push('/project');
        }

    }

    onAddField = () => {
        const fields = [...this.state.fields];

        const field = {
            Field: '',
            Type: 'Number',
            Formula: '',
            showFormula: false,
        }

        fields.push(field);

        this.setState({
            fields: fields,
        })
    }

    onClickDelete = (event, index) => {
        const fields = [...this.state.fields];

        fields.splice(index, 1);

        this.setState({
            fields: fields
        })
    }

    // change field
    onChangeField = (event, index) => {

        const fields = [...this.state.fields];

        fields.forEach((field, i) => {
            if (i === index) {
                field.Field = event.target.value;
            }
        })

        this.setState({
            fields: fields,
        })
    }

    // change type
    onChangeType = (event, index) => {

        const fields = [...this.state.fields];
        fields.forEach((field, i) => {
            if (i === index) {
                field.Type = event.target.value;
                if (event.target.value === 'Formula') {
                    field.showFormula = true;
                } else {
                    field.showFormula = false;
                }
            }
        })
        this.setState({
            fields: fields,
        })
    }

    onChangeFormula = (event, index) => {

        const fields = [...this.state.fields];

        fields.forEach((field, i) => {
            if (i === index) {
                field.Formula = event.target.value;
            }
        })

        this.setState({
            fields: fields,
        })
    }

    // change header check
    onClickCheckbox = (event, index) => {
        const headers = [...this.state.headers];

        headers.forEach((headerInfo, i) => {
            if (i === index) {
                headerInfo.checked = event.target.checked;
            }
        })
        this.setState({
            headers: headers,
        });

    }

    onHandleSave = () => {
        // aggregate headers and fields to formula page

        const headers = [...this.state.headers];
        const fields = [...this.state.fields];

        const rows = [...this.props.project.choosenRows];

        // delete unchoose rows value from original headers
        rows.forEach(row => {
            headers.forEach(headerInfo => {
                if(!headerInfo.checked){
                    delete row[headerInfo.value];
                }
            })
        })
        
        const newHeaders = [];

        // need add header type in 
        // handle headers
        headers.forEach((headerInfo) => {
            if(headerInfo.checked){
                newHeaders.push(headerInfo.value);
            }
        })

        // add new fields type to ttmap
        const ttMap = {...this.state.ttMap};
        

        // handle fields
        fields.forEach((field) => {
            newHeaders.push(field.Field);
            ttMap[field.Field] = field.Type;
        })

        // handle rows
        // add fields into rows with initial value

        rows.forEach((row) => {
            fields.forEach((field) => {
                switch(field.Type){
                    case ('Number'):
                        row[field.Field] = 0;
                        break;
                    case ('Formula'):
                        row[field.Field] = 0;
                        break;
                    default:
                        row[field.Field] = '';
                }
            })
        })

        // send to redux
        const projectInfo = {
            projectId: this.props.project.projectId,
            projectName: this.props.project.projectName,
        }
        this.props.dispatch(projectActions.sendChoosenRows(projectInfo, newHeaders, rows, ttMap));


        console.log(newHeaders);


        history.push('/formula');
    }


    render() {
        console.log(this.state);
        return (
            <div className={style.template}>
                <div className={style.table}>
                    <div className={style.scope}>
                        <div className={style.title}>
                            Project Scope Fiedls
                    </div>
                        {this.state.headers.map((headerInfo, index) => {
                            return (
                                <div key={index} className={style.feature}>
                                    <div className={style.left}>
                                        {headerInfo.value}
                                    </div>

                                    {headerInfo.value === 'resourceName' || headerInfo.value === 'resourceCode' ?
                                        <div className={style.right}>
                                            <input type="checkbox" disabled="disabled" onClick={(event) => this.onClickCheckbox(event, index)} checked></input>
                                        </div>
                                        :
                                        <div className={style.right}>
                                            <input type="checkbox" onClick={(event) => this.onClickCheckbox(event, index)}></input>
                                        </div>
                                
                                }



                                </div>
                            )
                        })}
                    </div>

                    <div className={style.survey}>
                        <div className={style.title}>
                            Quantity Survey Fiedls
                    </div>

                        {!this.state.fields ? null :
                            this.state.fields.map((field, index) => {
                                return (
                                    <Field
                                        key={index}
                                        showFormula={field.showFormula}
                                        clickDelete={(event) => this.onClickDelete(event, index)}
                                        changeField={(event) => this.onChangeField(event, index)}
                                        changeType={(event) => this.onChangeType(event, index)}
                                        changeFormula={(event) => this.onChangeFormula(event, index)}
                                        fieldValue={field.Field}
                                        formulaValue={field.Formula}
                                    />
                                )

                            })
                        }

                        <div className={style.addField}>
                            <label>Add Field</label>
                            <button onClick={this.onAddField}> <i className="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>

                <div className={style.footer}>
                    <div></div>
                    <button onClick={this.onHandleSave}>Save</button>
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


export default connect(mapStateToProps)(Template);


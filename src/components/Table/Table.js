
import React, { Component } from 'react';
import style from './Table.module.css';
import Cell from './Cell/Cell';

class Table extends Component {


    // renderHeader = () => {
    //     return (
    //         <tr>
    //             {this.props.headers.map((title) => {
    //                 return (
    //                     <th key={title}>{title}</th>
    //                 )
    //             })}
    //         </tr>
    //     )
    // }

    // renderRows = () => {
    //     return (
    //         this.props.rows.map((row) => {
    //             return (
    //                 <tr key={row.resourceId}>

    //                     {Object.keys(row).filter((property) => {
    //                         if (property === 'resourceId') {
    //                             return false;
    //                         }
    //                         return true;
    //                     }).map((element) => {
    //                         return (
    //                             <td key={element}>{row[element]}</td>
    //                         )
    //                     })}

    //                 </tr>
    //             )
    //         })
    //     )
    // }


    calculateCellWidth = () => {

        const totalWidth = this.props.totalWidth;
        // console.log(totalWidth);
        const number = this.props.headers.length;
        
        let width = null;
        if(number <= 4){
            width = totalWidth / number;
        }else{
            width = totalWidth / 4;
        }

        return width;
    }

    render() {

        if(!this.props.headers){
            return null;
        }
        
        const width = this.calculateCellWidth();

        


        return (

            <div className={style.table}>
                <div className={style.row}>

                    {this.props.headers.map((head) => {
                        return (
                            <Cell
                                key={head}
                                text={head}
                                type="header"
                                cellWidth={width}
                            />
                        )
                    })}
                </div>



                {this.props.rows.map((row) => {
                    const inputType = row.inputType;
                    return (
                        <div className={style.row} key={row.resourceId}>

                            {Object.keys(row).filter((property) => {
                                if (property === 'resourceId') {
                                    return false;
                                }

                                if(property === 'inputType'){
                                    return false;
                                }
                                return true;
                            }).map((element) => {

                                const keyValue = [row.resourceId, element];
                                return (
                                    
                                    <Cell
                                        key={keyValue}
                                        text={row[element]}
                                        type={inputType}
                                        changed={(event) => this.props.changed(event, keyValue)}
                                        goodClicked={(event) => this.props.goodClicked(event, keyValue)}
                                        cancelClicked={(event) => this.props.cancelClicked(event, keyValue)}
                                        cellWidth={width}
                                        name={element}
                                        checked={(event)=>this.props.clickedCheck(event, keyValue)}
                                    />
                                )
                            })}

                        </div>
                    )
                })}

            </div>

        );
    }


}

export default Table;
import React from 'react';
import style from './Cell.module.css';

const Cell = (props) => {

    let cell = null;

    const classes = {
        width: props.cellWidth,
    }

    let showRest = null;

    if(props.name !== 'resourceName'){
        showRest = {
            visibility: 'hidden',
        }
    }else{
        showRest = {
            visibility: 'visible',
        }
    }

    


    switch (props.type) {
        case ('header'):
            cell =
                <input className={style.head} style={classes}
                    type="text" value={props.text}
                    readOnly></input>
            break;
        case ('check'):
            cell = <div className={style.check} style={classes}>
                <input className={style.checkleft} style={showRest} type="checkbox" onChange={props.checked}></input>
                <input className={style.checkright} type="text" value={props.text} readOnly></input>
            </div>
            break;
        case ('input'):
            cell = <input className={style.input} style={classes}
            type="text" value={props.text} onChange={props.changed}></input>
            break;
        case ('addrow'):
            cell = 
            <div className={style.addrow} style={classes}>
                <i className="fas fa-check" onClick={props.goodClicked} style={showRest}></i>
                <i className="fas fa-times" onClick={props.cancelClicked} style={showRest}></i>
                <input className={style.addrowright} type="text" value={props.text} onChange={props.changed}></input>
            </div>
            break;
        default:
            cell =
                <input className={style.default} style={classes}
                type="text" value={props.text} readOnly></input>
    }

    return (
        <div className={style.cell} style={classes}>
            {cell}
        </div>


    )
}

export default Cell;
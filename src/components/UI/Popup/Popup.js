import React from 'react';
import style from './Popup.module.css';


const Popup = (props) => {

    let row = null;

    let option = props.data;

    switch (option.type) {
        case ('row'):
            row = <div className={style.row} onClick={props.clicked}>
                <div className={style.left}>
                    <i className="fas fa-book-reader"></i>
                </div>
                <div className={style.right}>{option.text}</div>
            </div>;
            break;
        case ('column'):
            row = <div className={style.row} onClick={props.clicked}>


                <div className={style.left}>
                    <i className="fas fa-book"></i>
                </div>
                <div className={style.right}>{option.text}</div>
            </div>
            break;
        case ('csv'):
            row = <div className={style.row} onClick={props.clicked}>
                <div className={style.left}>
                    <i className="fas fa-file-csv"></i>
                </div>
                <div className={style.right}>{option.text}</div>

            </div>
            break;
        default:
            row = <div className={style.row} onClick={props.clicked}>
                <div className={style.leftDefault}>
                    <input type='checkbox'></input>
                </div>
                <div className={style.rightDefault}>{option.text}</div>


            </div>

    }





    return (

        <div className={style.popup}>

            {row}

        </div>
    )
}


export default Popup;
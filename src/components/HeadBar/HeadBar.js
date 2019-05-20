import React, { Component } from 'react';
import style from './HeadBar.module.css';
// import logo from '../../../public/img/koreraLogo.png';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.action';
import { projectActions } from '../../_actions/project.action';

class HeadBar extends Component {

    state = {
        showPop: false
    }

    showPopup = () => {
        if (this.state.showPop) {
            document.getElementById('myPopup').style.visibility = 'hidden';
            this.setState({
                showPop: !this.state.showPop,
            })
        } else {
            document.getElementById('myPopup').style.visibility = 'visible';
            this.setState({
                showPop: !this.state.showPop,
            });
        }


    }

    logout = () => {
        this.props.dispatch(projectActions.clearProject())
        this.props.dispatch(userActions.logout());

        this.showPopup();


    }

    render() {
        const user = this.props.user;
        let userName='';
        let createdTime='';
        let since = '';
        
        if(user){
            userName = user.userName;
            createdTime = user.createdTime;

            const month = createdTime.split('-')[1];
            const year = createdTime.split('-')[0];
            createdTime = month + '-' + year;
            since = 'Member Since';
        }
        return (

            <div className={style.header}>
                <div className={style.part}>
                    <img src="./img/koreraLogo.png" alt=""></img>
                </div>

                <div className={style.part} id={style.title}>
                    <h1>{this.props.project.projectName}</h1>
                </div>

                <div className={style.part} id={style.user}>



                    <div className={style.box}>
                        <i className="fas fa-user-circle" onClick={this.showPopup}></i>
                        <div className={style.popupbox} id="myPopup">
                            
                            <div>
                                <div className={style.userinfo} id={style.userinfoname}>
                                    {userName}
                                    </div>
                                <div className={style.userinfo}>
                                    {since}
                                    </div>
                                <div className={style.userinfo}>
                                    {createdTime}
                                    </div>
                            </div>
                            <div className={style.buttons}>
                                <button>Profile</button>
                                <button onClick={this.logout}>Sign Out</button>
                            </div>
                        </div>
                    </div>





                    <h2>{userName}</h2>

                    <i className="far fa-question-circle" id={style.question}></i>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.user,
        project: state.project,
    };
}



export default connect(mapStateToProps)(HeadBar);

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { tableActions } from '../../_actions/table.action';

class Navbar extends Component {

    state = {
        barIsOpen: false,
        barImage: '>',

    }

    class = [];

    handleNav = () => {
        console.log('in handle nav');

        if (this.state.barIsOpen) {
            document.getElementById('mySidebar').style.width = "0px";
            document.getElementById('main').style.marginLeft = "0px";
            document.getElementById("mainBody").style.marginLeft = "60px";
            document.getElementById("mainBody").style.width = "90%";

            this.setState({
                barIsOpen: !this.state.barIsOpen,
                barImage: '>'
            });

            const _totalWidth = document.getElementById('mainBody').offsetWidth;
            console.log('in one');
            console.log(_totalWidth);
            this.props.dispatch(tableActions.changeTableWidth(_totalWidth));
            
        } else {
            document.getElementById('mySidebar').style.width = "250px";
            document.getElementById('main').style.marginLeft = "250px";
            document.getElementById("mainBody").style.marginLeft = "300px";
            document.getElementById("mainBody").style.width = "70%";

            this.setState({
                barIsOpen: !this.state.barIsOpen,
                barImage: '<'
            })

            // document.getElementById('mainBody').getElementsByClassName('table-cell').width='200px;'

            const _totalWidth = document.getElementById('mainBody').clientWidth;
            console.log('in two');
            console.log(_totalWidth);
            
            
            this.props.dispatch(tableActions.changeTableWidth(_totalWidth));
            
        }

    }





    render() {
        return (
            <div>

                <div id="mySidebar" className={styles.sidebar}>
                    <ul>
                        <li>
                            <NavLink className={styles.link}
                                to="/resources"
                            >Resources</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.link}
                                to="/project"
                            >Projects</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.link}
                                to="/formula"
                            >Formula</NavLink>
                        </li>
                    </ul>
                </div>

                <div id="main" className={styles.main}>
                    <button className={styles.openbtn} onClick={this.handleNav}>{this.state.barImage}</button>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps)(Navbar);
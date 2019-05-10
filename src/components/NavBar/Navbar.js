import React, { Component } from 'react';

import styles from './Navbar.module.css';

class Navbar extends Component {

    state = {

    }

    openNav = () => {
        const style = {
            width: '250px'
        }
        styles.sidebar.width = "250px";
        styles.main.style.marginLeft = "250px";
    }



    render() {
        return (
            <div className={styles.wrapper}>

                <div className={styles.sidebar}>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>

                <div className={styles.main}>
                    <button className={styles.openbtn} onClick={this.openNav}>&#9776; Toggle Sidebar</button>
                </div>

            </div>
        )
    }
}

export default Navbar;
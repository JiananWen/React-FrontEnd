import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Login.module.css';

import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.action';


class Login extends Component {

    state = {
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();  // ?
        this.setState({
            loading: true,
        });

        let formData = {};
        for (let index in this.state.loginForm) {
            formData[index] = this.state.loginForm[index].value;
        }

        const username = this.state.loginForm.username.value;
        const password = this.state.loginForm.password.value;

        // console.log(formData);

        if(username && password){
            this.props.dispatch(userActions.login(username, password));
        }
        

        // post request
    }

    inputChangedHandler = (event, id) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[id]
        };

        updatedFormElement.touched = true;

        // change state value
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedLoginForm[id] = updatedFormElement;

        // check form is valid or not
        let formIsValid = true;
        for (let index in updatedLoginForm) {
            formIsValid = updatedLoginForm[index].valid && formIsValid;
        }
        // change state
        this.setState({
            loginForm: updatedLoginForm,
            formIsValid: formIsValid,
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        label={formElement.id}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );
        return (
            <div className={styles.login}>
                <h2>Login</h2>
                {form}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps)(Login);


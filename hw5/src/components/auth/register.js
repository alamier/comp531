import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        <div className="register-form-container">
            <h1>Registration</h1>
            <form id="registration-form" onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>
                <p className="form-text-title">User Name <span className="span-alert">*</span></p>
                <input className="form-text-input" type="text" it="username" ref={(node) => this.username = node } placeholder="Your User name" required/>
                <p className="form-text-title">Email Address <span className="span-alert">*</span></p>
                <input className="form-text-input" type="email" id="email" ref={(node) => this.email = node } placeholder="Email" required/>
                <p className="form-text-title">Zipcode <span className="span-alert">*</span></p>
                <input className="form-text-input" type="text" id="zipcode" ref={(node) => this.zipcode = node } placeholder="12345 or 12345-1234" required pattern="^\d{5}(-\d{4})?"/>
                <p className="form-text-title">Password <span className="span-alert">*</span></p>
                <input className="form-text-input" type="password" id="password" ref={(node) => this.password = node } required/>
                <p className="form-text-title">Password Confirmation <span id="passwordCheck" className="span-alert">*</span></p>
                <input className="form-text-input" type="password" id="pwconf" ref={(node) => this.pwconf = node } required/>

                <input className="primary-button" type="submit"/>
            </form>
        </div>
        
    )}
}

export default connect()(Register)

/**
 * Created by zhou on 10/23/16.
 */
import React from 'react'
import { connect } from 'react-redux'

import { localLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    // login form, login form is attached with the navigation bar
    return (
    <div className="menubar-container">
        <div className="menubar-content-container">
            <div className="menubar-right-container">
                <table>
                    <tr>
                        <td>
                            <label>email</label>
                        </td>
                        <td>
                            <label>password</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" id="loginUsername" placeholder="username" 
                                ref={(node) => {username = node}}/>
                        </td>
                        <td>
                            <input type="password" id="loginPassword" placeholder="password" 
                                ref={(node) => {password = node}}/>
                        </td>
                        <td>
                            <button id="loginButton"
                                onClick={() => { dispatch(localLogin(username.value, password.value)) }}>Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td id="log-email-info"></td>
                        <td id="log-password-info"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    )
}

export default connect()(Login)

/**
 * Created by zhou on 10/23/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import {searchKeyword} from '../article/articleActions'
import { logout } from '../auth/authActions'

const Nav = ({username, onProfile, dispatch}) => {
    let keyword = ''
    return (
        <nav className="navbar navbar-static">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><b>Ricebook</b></a>
                    <a className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </a>
                </div>
                {
                    // if user is logged in
                    username.length == 0 ? '' :
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-right navbar-nav">
                                {
                                    // if user is on profile page
                                    onProfile ? '' :
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i
                                                className="glyphicon glyphicon-search"></i></a>
                                            <ul className="dropdown-menu">
                                                <li><input className="input-text" type="text" placeholder="search your feed"
                                                           ref={(node) => keyword = node }
                                                           onChange={() => {
                                                               dispatch(searchKeyword(keyword.value))
                                                           }}/>
                                                </li>
                                            </ul>
                                        </li>
                                }

                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="glyphicon glyphicon-user"></i>
                                        <i className="glyphicon glyphicon-chevron-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" onClick={() => {
                                            dispatch(logout())
                                        }}>Logout</a></li>
                                        {
                                            onProfile ?
                                                <li><a href="#" onClick={() => {
                                                    dispatch(navToMain())
                                                }}>Home</a></li> :
                                                <li><a href="#" onClick={() => {
                                                    dispatch(navToProfile())
                                                }}>Profile</a></li>
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                }
            </div>
        </nav>
    )
}

export default connect(
  (state) => {
    return {
      username: state.profile.username || '',
      onProfile: state.common.location == 'profile' }
  })(Nav)

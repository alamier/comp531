/**
 * Created by zhou on 10/23/16.
 */
import React from 'react'
import { connect } from 'react-redux'

import Nav from './navbar/nav'
import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

const App = ({location}) => {

    // routing logic to determine which view to display.
    let view
    switch(location) {
        case 'main': view = <Main/>; break;
        case 'profile': view = <Profile/>; break;
        default: view = <Landing/>; break;
    }

    //site structure: app -> nav + view -> (main | profile | login)
    return (
        <div>
            <Nav/>
            { view }
        </div>
    )
}

const app = connect((state) => {
    return { location: state.common.location }
})(App)

export default app
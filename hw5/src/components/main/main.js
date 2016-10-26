import React from 'react'

import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'

// main page structure
const Main = () => (
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="main-profile-container">
                    <Headline/>
                </div>
            </div>
            <div className="col-md-7">
                <ArticlesView/>
            </div>
            <div className="col-md-2">
                <Following/>
            </div>
        </div>
    </div>
)

export default Main

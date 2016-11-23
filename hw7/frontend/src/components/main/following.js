/**
 * Created by zhou on 10/23/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

// followers display structure
const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="users-container" name="follower">
        <div className="user-container">
            <img src={ avatar }/>
                <h4>{name}</h4>
                <p>{headline}</p>
                <button className="unfollow-button" 
                onClick={() => { dispatch(delFollower(name)) }}>Unfollow</button>
        </div>
    </div>
)

// props of followers
Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
            <div>
                {   // display followers
                    Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline}
                        dispatch={this.props.dispatch} />
                )}
                <div className="row">&nbsp;</div>
                <div className="row">
                    <input id="addFollowerInput" className="form-control" type="text"
                        placeholder="add a follower"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => {
                            this.forceUpdate()
                        }}/>
                {   // add new followers
                    !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                    <input id="addFollowerButton" className="btn btn-primary" type="button"
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="add follower"/>
                }
                { this.props.error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        { this.props.error }
                    </div>
                }
                </div>
            </div>
    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)


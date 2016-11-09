/**
 * Created by zhou on 10/23/16.
 */
import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        const date = moment(new Date(this.props.date))
        return (
            <div className="comment-container">
                <img className="article-author-image" src={ this.props.avatar }/>
                <b>{this.props.author}</b> commented on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
                <ContentEditable className="media-body" html={this.props.text}
                         contentEditable={this.props.username == this.props.author}
                         tooltip={this.props.username == this.props.author ? 'click to edit' : ''}
                         onChange={(e) => {
                             this.newMessage = e.target.value
                             this.disabled = this.props.text == this.newMessage
                             this.forceUpdate()
                }}/>
                { // show the update button if current user is the author of the comment
                    this.props.username != this.props.author ? '' :
                    <div className="media-right">
                    <span className="btn btn-primary"
                          title="Click the text to edit your comment"
                          disabled={ this.disabled }
                          onClick={() => {
                              this.props.dispatch(editArticle(this.props.articleId, this.newMessage, this.props.commentId))
                              this.disabled = true
                          }}>
                        Update comment
                    </span>
                    </div>
                }
            </div>
    )}
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)


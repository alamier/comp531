/**
 * Created by zhou on 10/23/16.
 */
import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'
import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

class Article extends Component {

  constructor(props) {
    super(props)
    this.hideComments = true
    this.disabled = true
    this.addComment = false
    this.newComment = ''
  }

  //article display structure
  render() {
    const date = moment(new Date(this.props.date))
    return (
        <div className="article-continer">
          <div className="article-author-container">
            <img className="article-author-image" src={ this.props.avatar }/>
            <b>{this.props.author}</b> on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
          </div>
          <div className="img-card">
            <img className="img-card-image" src={this.props.img}/>
            <div className="card-text">
            <ContentEditable html={this.props.text}
              contentEditable={this.props.username == this.props.author}
              tooltip={this.props.username == this.props.author ? 'click to edit' : ''}
              onChange={(e) => {
              this.newMessage = e.target.value
              this.disabled = this.props.text == this.newMessage
              this.forceUpdate()
              }}/>
            </div>
            { // show the edit button if the author is the same as current user
              this.props.author == this.props.username ?
                <div>
                  <button className="card-button-3-left" onClick={() => {
                    this.hideComments = !this.hideComments
                    this.forceUpdate()
                  }}>{ this.hideComments ? 'Show' : 'Hide' } Comments ({ this.props.comments.length })</button>
                  <button className="card-button-3-mid" onClick={() => {
                    this.addComment = !this.addComment; this.forceUpdate()
                  }}>{ this.addComment ? 'Cancel' : 'Comment' }</button>
                  <button className="card-button-3-right" disabled={this.disabled} onClick={() => {
                    this.props.dispatch(editArticle(this.props._id, this.newMessage))
                    this.disabled = true
                    this.forceUpdate()
                    }}>Edit</button>
                  <div className="clear"></div>
                </div>
              :
                <div>
                  <button className="card-button-2" onClick={() => {
                    this.hideComments = !this.hideComments
                    this.forceUpdate()
                  }}>{ this.hideComments ? 'Show' : 'Hide' } Comments ({ this.props.comments.length })</button>
                  <button className="card-button-2-right" onClick={() => {
                    this.addComment = !this.addComment; this.forceUpdate()
                  }}>{ this.addComment ? 'Cancel' : 'Comment' }</button>
                  <div className="clear"></div>
                </div>
            }

            { !this.addComment ? '' :
                  <div>
              <textarea className="newPostText"
                        cols="80" rows="4" placeholder="your comment"
                        value={this.newComment}
                        onChange={(e) => {
                          this.newComment = e.target.value
                          this.forceUpdate()
                        }}>
              </textarea>
                    <label className="btn btn-success"
                           disabled={ this.newComment.length == 0 }
                           onClick={() => {
                             if (this.newComment.length > 0)
                               this.props.dispatch(editArticle(this.props._id, this.newComment, -1))
                             this.newComment = ''
                             this.addComment = false
                             this.forceUpdate()
                           }}>
                      Make the comment
                    </label>
                  </div>
            }

            { // logic for show/hide comments
              this.hideComments ? '' : this.props.comments.sort((a,b) => {
              if (a.date < b.date)
                return 1
              if (a.date > b.date)
                return -1
              return 0
            }).map((comment) =>
                <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
                         commentId={comment.commentId} author={comment.author} date={comment.date}
                         text={comment.text} avatar={comment.avatar} />
            )}
          </div>
        </div>

  )}
}

Article.propTypes = {
  _id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...Comment.propTypes
  }).isRequired).isRequired
}

export default connect()(Article)

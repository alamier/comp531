import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const ToDoItem = ({ text, done, toggle, remove }) => (
    <li>
        <span className="check glyphicon glyphicon-check" onClick={toggle}>z</span>
        <span className={ done ? "completed" : ""}>{ text }</span>
        <span className="destroy glyphicon glyphicon-remove" onClick={remove}>x</span>
    </li>
)

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default connect(null, (dispatch, ownProps) => {
        return {
            remove: () => dispatch({ type: 'REMOVE_TODO', id: ownProps.id }),
            toggle: () => dispatch({ type: 'TOGGLE_TODO', id: ownProps.id })
        }
    })(ToDoItem)

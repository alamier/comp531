/**
 * Created by zhou on 10/23/16.
 */
import Action, { resource, updateError, updateSuccess, navToMain, navToOut, apiUrl } from '../../actions'

import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile, validateProfile } from '../profile/profileActions'

const fbUrl = apiUrl + "/login/facebook"

export function initialVisit() {
    return (dispatch) => {
        // try to log in
        resource('GET', 'headlines').then((response) => {
            dispatch(navToMain())
            dispatch({type: Action.UPDATE_HEADLINE,
                username: response.headlines[0].username,
                headline: response.headlines[0].headline
            })
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        }).catch((err) => {
            // do nothing
        })
    }
}

export function localLogin(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
        .then((response) => {
            dispatch({type: Action.LOGIN_LOCAL, username: response.username})
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`There was an error logging in as ${username}`))
        })
    }
}

export function fbLogin(){
    return (dispatch) => {
        // resource('GET','auth/facebook')
        // .catch((err) => {
        //     dispatch(updateError(`There was an error logging with facebook`))
        // })
        window.top.location = fbUrl

    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
        .catch((err) => {
            dispatch({type: Action.LOGIN_LOCAL, username: undefined})
            dispatch(navToOut())
        })
    }
}

export function register({username, email, dob, zipcode, password, pwconf}) {
    return (dispatch) => {
        if (!username || !email || !dob || !zipcode || !password || !pwconf) {
            return dispatch(updateError('All fields must be supplied'))
        }

        const err = validateProfile({username, email, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }

        resource('POST', 'register', {username, email, dob, zipcode, password})
        .then((response) => {
            return dispatch(updateSuccess(`Success!  You can now log in as "${response.username}".`))
        }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"))
        })
    }
}

/**
 * Created by zhou on 10/23/16.
 */
import fetch from 'isomorphic-fetch'

const isLocal = false
export const apiUrl = isLocal ? 'http://localhost:3000' : 'https://zl48finalserver.herokuapp.com'

// Action enum
const Action = {

     ADD_ARTICLE: 'ADD_ARTICLE'
    ,UPDATE_ARTICLES: 'UPDATE_ARTICLES'
    ,EDIT_ARTICLE: 'EDIT_ARTICLE'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_AVATARS: 'UPDATE_AVATARS'

    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_PROFILE: 'UPDATE_PROFILE'

    ,FOLLOWER_UPDATE: 'FOLLOWER_UPDATE'

    ,ERROR: 'ERROR'
    ,SUCCESS: 'SUCCESS'

    ,NAV_PROFILE: 'NAV_PROFILE'
    ,NAV_MAIN: 'NAV_MAIN'
    ,NAV_OUT: 'NAV_OUT'

    ,LOGIN_LOCAL: 'LOGIN_LOCAL'
}

export default Action

// action generator
export function updateError(error) { return { type: Action.ERROR, error }}
export function updateSuccess(success) { return { type: Action.SUCCESS, success }}
export function navToProfile() { return { type: Action.NAV_PROFILE }}
export function navToMain() { return { type: Action.NAV_MAIN }}
export function navToOut() { return { type: Action.NAV_OUT }}

// resource function
export function resource(method, endpoint, payload, submitJson = true) {
    const options = {credentials: 'include', method}
    if (submitJson) options.headers = {'Content-Type': 'application/json'}
    if (payload) {
        options.body = submitJson ? JSON.stringify(payload) : payload
    }

    console.log("fetch: " + `${apiUrl}/${endpoint}` + " with options: " + options)
    return fetch(`${apiUrl}/${endpoint}`, options)
    .then((response) => {
        if (response.status == 401) {
            const message = `Error in ${method} ${endpoint} ${JSON.stringify(response.json())}`
            throw new Error(message)
        } else {
            return response.json()
        }
    })
}
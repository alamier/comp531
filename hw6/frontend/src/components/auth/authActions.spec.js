/**
 * Created by zhou on 10/26/16.
 */
import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {localLogin, logout} from './authActions'
import Action from '../../actions'

describe('Validate authActions', () => {
    var url
    beforeEach(() => {
        global.fetch = fetch
        url = require('../../actions').apiUrl
    })

    it('should log the valid user in', () => {
        mock(url + "/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        localLogin("zl48","thrown-gather-power")((action) => {
            expect(action.type).to.eql(Action.LOGIN_LOCAL)
            expect(action.username).to.eql("zl48")
        })
    })

    it('should not log in an invalid user', () => {
        mock(url + "/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        localLogin("zl48","asdfsaf")((action) => {
            expect(action.type).to.eql(Action.ERROR)
            expect(action.username).to.eql("There was an error logging in as zl48")
        })
    })

    it('should log the user out', () => {
        mock(url + "/login", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        })

        logout()(action => {
            expect(action.type).to.eql(Action.LOGIN_LOCAL)
            expect(action.username).to.eql(undefined)
        })
    })
})
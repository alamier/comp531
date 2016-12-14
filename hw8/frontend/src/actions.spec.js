/**
 * Created by zhou on 10/26/16.
 */
import { expect } from 'chai'
import Action from './actions'
import {updateError,updateSuccess,navToMain,navToOut,navToProfile} from './actions'

describe('Test the Actions', () => {
    it('should updateError', () => {
        expect(updateError("test")).to.eql({
            type: Action.ERROR,
            error: "test"
        })
    })

    it('should updateSuccess', () => {
        expect(updateSuccess("test")).to.eql({
            type: Action.SUCCESS,
            success: "test"
        })
    })

    it('should navToMain', () => {
        expect(navToMain()).to.eql({
            type: Action.NAV_MAIN,
        })
    })

    it('should navToOut', () => {
        expect(navToOut()).to.eql({
            type: Action.NAV_OUT,
        })
    })

    it('should navToProfile', () => {
        expect(navToProfile()).to.eql({
            type: Action.NAV_PROFILE,
        })
    })

})
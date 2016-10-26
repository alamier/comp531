/**
 * Created by zhou on 10/26/16.
 */
import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {fetchFollowers} from './followingActions'
import Action from '../../actions'

describe('Validate followingActions', () => {
    it('should return already following the followers', () => {
        fetchFollowers('PUT',"zhou")(action => {
            expect(action.type).to.eql(Action.ERROR)
            expect(action.error).to.eql("Already following zhou")
        },() => {
            return {
                followers:{
                    followers:{
                        zhou:"zhou"
                    }
                }
            }
        })
    })
})
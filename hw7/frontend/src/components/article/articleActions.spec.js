/**
 * Created by zhou on 10/26/16.
 */
import {expect} from 'chai'
import {searchKeyword} from './articleActions'
import Action from '../../actions'

describe('Test articleActions', () => {
    it('should searchKeyword', () => {
        expect(searchKeyword("hello")).to.eql(
            {
                type:Action.SEARCH_KEYWORD,
                keyword:"hello"
            }
        )
    })
})


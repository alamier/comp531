/**
 * Created by zhou on 10/25/16.
 */
import {expect} from 'chai'
import {validateProfile, updateHeadline} from './profileActions'

describe('Test the validateProfile', () => {
    it('should return Invalid username', () => {
        expect(validateProfile({username:"!"})).to.eql(
            'Invalid username.  Must start with a letter and can only contains letters and numbers.'
        )
    })

    it('should return Invalid email', () => {
        expect(validateProfile({email:"!"})).to.eql(
            'Invalid email.  Must be like a@b.co'
        )
    })

    it('should return Invalid zipcode', () => {
        expect(validateProfile({zipcode:"!"})).to.eql(
            'Invalid zipcode.  Must be 5 digits in length, e.g., 77005'
        )
    })

    it('should return password do not match', () => {
        expect(validateProfile({password:"!",pwconf:"123"})).to.eql(
            'Password do not match'
        )
    })
})
import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Registeration functionality', () => {

    before('should register', (done) => {
        go().then(done)
    })

    it('should register new user', (done) => {
        sleep(500)
        .then(findId('username').sendKeys('testuser'))
        .then(findId('email').sendKeys('test@rice.edu'))
        .then(findId('zipcode').sendKeys('12345'))
        .then(findId('password').sendKeys('1234123'))
        .then(findId('pwconf').sendKeys('1234123'))
        .then(findId('registerSubmitButton').click())
        .then(sleep(500))
        .then(findId('successMessage').then((e)=>{
            expect(e).to.exist
        }))
        .then(sleep(500))
        .then(done)
    })
})
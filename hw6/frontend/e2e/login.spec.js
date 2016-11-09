import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClassName, findAllCSS } from './selenium'
import common from './common'

const webdriver = require('selenium-webdriver')

describe('Test Frontend login', () => {
    const preamble = 'you are logged in as'

    before('should log in as test user', (done) => {
        go().then(common.login).then(done)
    })

    it('should successfully log in', (done) => {
        sleep(500)
        .then(expect(findId('headlineShow')).to.exist)
        .then(done)
    })

    it('Should create a new article and validate article appears in feed', (done) => {
        sleep(500)
        .then(findId('newPostTextarea').clear())
        .then(findId('newPostTextarea').sendKeys("zl48:a new article"))
        .then(findId('publishButton').click())
        .then(sleep(500))
        .then(findClassName('article-content').getText()
            .then((text)=>{ expect(text).to.be.eql("zl48:a new article")}))
        .then(sleep(500))
        .then(done)
    })

    it('Shoule edit an article and validate article appears in feed', (done) => {
        var newarticle
        sleep(500)
        .then(findClassName('article-content').getText()
            .then (text => { 
                newarticle = text + " add something here_zl48" 
                sleep(500)
                findClassName('article-content').clear()
                findClassName('article-content').sendKeys(newarticle)
                findClassName('card-button-3-right').click()
                sleep(500)
            }))
        .then(findClassName('article-content').getText()
            .then(text => { expect(text).to.equal(newarticle) }))           
        .then(done)
    })

    it('should update headline and verify change', (done) => {
        const newHeadline = "new headline"
        const oldHeadline = "old headline"
        findId('headlineInput').sendKeys(oldHeadline)
        .then(findId('updateHeadlineButton').click())
        .then(sleep(1000))
        .then(findId('headlineShow').getText()
            .then( text => { expect(text).to.equal(oldHeadline) }))
        .then(findId('headlineInput').clear())
        .then(findId('headlineInput').sendKeys(newHeadline))
        .then(findId('updateHeadlineButton').click())
        .then(sleep(1000))
        .then(findId('headlineShow').getText()
            .then( text => { expect(text).to.equal(newHeadline) }))
        .then(done)
    })

    it('Should add "Follower" to the followed list and verify following count increases by one', (done) => {
        
        var followerCount
        sleep(500)
        .then(findAllCSS('[name = "follower"]')
            .then(followers => {
                followerCount = followers.length
                findId('addFollowerInput').sendKeys('Follower')
                sleep(500)
                findId('addFollowerButton').click()
                sleep(500)
                findAllCSS('[name = "follower"]')
                .then(followers => {
                    expect(followers.length).to.equal(followerCount+1)
                })
            })
            .then(done))        
    })

    it('Should remove "Follower" from the followed list and verify following count decreases by one', (done) => {
        var followerCount
        sleep(500)
        .then(findAllCSS('[name = "follower"]')
            .then(followers => {
                followerCount = followers.length
                findClassName('unfollow-button').click()
                sleep(500)
                findAllCSS('[name = "follower"]')
                .then(followers => {
                    expect(followers.length).to.equal(followerCount-1)
                })
            })
            .then(done))
    })

    it('Should search for "Only One Article Like This"', (done) => {
        const searchkey = "Only One Article Like This"
        sleep(1000)
        .then(findId('searchMenuButton').click())
        .then(findId('searchInput').clear())
        .then(findId('searchInput').sendKeys(searchkey))
        .then(sleep(1000))
        .then(findClassName('article-content').getText()
            .then(text => {expect(text.indexOf(searchkey)).to.not.equal(-1)}))
        .then(done)
    })

    it('should update the users email', (done) => {
        const oldEmail = "old@rice.edu"
        const newEmail = "new@rice.edu"
        sleep(1000)
        .then(findId('profileMenuButton').click())
        .then(findId('toProfileButton').click())
        .then(sleep(1000))
        .then(expect(findId('profileImage')).to.exist)

        .then(findId('email').clear())
        .then(findId('email').sendKeys(oldEmail))
        .then(findId('profileUpdateButton').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldEmail) }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newEmail))
        .then(findId('profileUpdateButton').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newEmail) }))
        .then(done)
    })

    it('should update the users zipcode', (done) => {
        const oldZip = "12345"
        const newZip = "77030"
        sleep(1000)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(oldZip))
        .then(findId('profileUpdateButton').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldZip) }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(newZip))
        .then(findId('profileUpdateButton').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newZip) }))
        .then(done)
    })

    it('should update the users password', (done) => {
        sleep(1000)
        .then(findId('password').clear())
        .then(findId('password').sendKeys('password'))
        .then(findId('pwconf').clear())
        .then(findId('pwconf').sendKeys('password'))
        .then(findId('profileUpdateButton').click())
        .then(sleep(1000))
        .then(findId('errorMessage').getText()
            .then((text)=>{ expect(text).to.equal('will not change password')}))
        .then(sleep(500))
        .then(done)
    })

    after('should log out', (done) => {
        sleep(500)
        common.logout().then(done)
    })
})
/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles.length >= 3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add a new article', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		var id
		fetch(url("/article"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"text": "article 1"
			})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles[0].text).to.eql("article 1")
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		
		fetch(url("/articles/" + 3))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles[0].id === 3).to.be.true
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return ID not found', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/50"),{
			method: "PUT",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"text":"some thing"
			})
		})
		.then(res => {
			expect(res.status).to.eql(401)
			return res.text()
		})
		.then(body => {
			expect(body).to.eql("ID not found!")
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id ', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/-1"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles.length).to.eql(0)
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should update the article', (done) => {
		fetch(url("/articles/1"),{
			method: "PUT",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"text":"some thing"
			})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles[0].text).to.eql("some thing")
		})
		.then(done)
		.catch(done)
	})
});

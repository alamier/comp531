/*
 * Test suite for following.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate following functionality', () => {
	it('should show following list', (done) => {
		fetch(url("/following/zl48test"),{
			method: "GET",
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		})
		.then(body => {
			expect(body.username).to.eql("zl48test")
		})
		.then(done)
		.catch(done)
	})
})
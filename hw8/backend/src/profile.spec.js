/*
 * Test suite for profile.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Unit test to validate PUT /headline', () => {

	it('should updates the headline message,', (done) => {
		// IMPLEMENT ME
		var oldHeadline;
		var newHeadline;
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			oldHeadline = body.headlines[0].headline
			newHeadline = oldHeadline + "_new"
		})
		.then(
			fetch(url("/headline"),{
				"method":"PUT",
				"headers": {'Content-Type': 'application/json'},
				"body": JSON.stringify({
					"headline": newHeadline
				})
			})
			.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
			})
			.then(body => {
				expect(body.headline).eql(newHeadline)
			})
			)
		.then(done)
		.catch(done)
 	}, 200)

});

/*
 * Test suite for auth.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Auth functionality', () => {
	it('should register a new user', (done) => {
		fetch(url("/register"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"username":"zhou",
				"password":"123456"
			})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		})
		.then(body => {
			expect(body.username).to.eql("zhou")
		})
		.then(done)
		.catch(done)
	})

	it('should login a previously registered user', (done) => {
		fetch(url("/login"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"username":"zhou",
				"password":"123456"
			})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json();
		})
		.then(body => {
			expect(body.username).to.eql("zhou")
			expect(body.result).to.eql("success")
		})
		.then(done)
		.catch(done)
	})

	it('should return Missing username or password!', (done) => {
		fetch(url("/login"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"username":"zhou"
			})
		})
		.then(res => {
			expect(res.status).to.eql(401)
			return res.text();
		})
		.then(body => {
			expect(body).to.eql("Missing username or password!")
		})
		.then(done)
		.catch(done)
	})

	it("should return User doesn't exist!", (done) => {
		fetch(url("/login"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"username":"not exist",
				"password":"not exit"
			})
		})
		.then(res => {
			expect(res.status).to.eql(401)
			return res.text();
		})
		.then(body => {
			expect(body).to.eql("User doesn't exist!")
		})
		.then(done)
		.catch(done)
	})

	it("should return Incorrect username or password!", (done) => {
		fetch(url("/login"),{
			method: "POST",
			headers: new Headers({
				"Content-Type":"application/json"
			}),
			body:JSON.stringify({
				"username":"zhou",
				"password":"123"
			})
		})
		.then(res => {
			expect(res.status).to.eql(401)
			return res.text();
		})
		.then(body => {
			expect(body).to.eql("Incorrect username or password!")
		})
		.then(done)
		.catch(done)
	})

	it("should logout", (done) => {
		fetch(url("/logout"),{
			method: "PUT",
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text();
		})
		.then(body => {
			expect(body).to.eql("OK")
		})
		.then(done)
		.catch(done)
	})
})
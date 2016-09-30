import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={"test text"}/>
			</div>)
		// findDOMNode and assert 3 children of the ToDoItem element
		const element = findDOMNode(node).children[0];
		expect(element.children.length).to.equal(3)
		// assert the className is ''
		expect(element.className).to.equal('')
		// assert the innerHTML of the todo is the text you initially set
		expect(element.children[1].innerHTML).to.equal("test text")
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={"test text"} toggle={() => {toggled = !toggled}}/>
			</div>)
		// when the checkbox is clicked via TestUtils.Simulate.click()
		const element = findDOMNode(node).children[0];
		TestUtils.Simulate.click(element.children[0]);
		// we expect the variable toggled to be true
		expect(toggled).to.be.true
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem text={"test text"} remove={() => {removed = !removed}}/>
			</div>)
		// when the remove button is clicked via TestUtils.Simulate.click()
		const element = findDOMNode(node).children[0];
		TestUtils.Simulate.click(element.children[2]);
		// we expect the variable removed to be true
		expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem done={true}/>
		</div>)
		// assert that the rendered className is "completed"
		const element = findDOMNode(node).children[0];
		expect(element.children[1].className).to.equal("completed")
	})

})

import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({velocity:[1,1], acceleration:[0.5, -0.5]})
        const {velocity} = update(p, 1.0)
        expect(velocity).to.eql([1.5, 0.5])
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check top side
        const pTop = particle({position:[50, -10]})
        const {position:positionTop} = update(pTop,0)
        expect(positionTop).to.eql([50,800])
        // check right side
        const pRight = particle({position:[810, 50]})
        const {position:positionRight} = update(pRight,0)
        expect(positionRight).to.eql([0,50])
        // check bottom side
        const pBottom = particle({position:[50, 810]})
        const {position:positionBottom} = update(pBottom,0)
        expect(positionBottom).to.eql([50,0])
        // check left side
        const pLeft = particle({position:[-10, 50]})
        const {position:positionLeft} = update(pLeft,0)
        expect(positionLeft).to.eql([800,50])
    })

})

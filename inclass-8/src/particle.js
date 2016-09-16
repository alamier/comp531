const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	let [x, y] = position
	let [velocity_x, velocity_y] = velocity
	let [acceleration_x, acceleration_y] = acceleration

	// update velocity
	velocity_x += acceleration_x * delta
	velocity_y += acceleration_y * delta

	// update position
	x = x + delta * velocity_x;
	y = y + delta * velocity_y;

	// wrap around the world
	if(x < 0) x = 800;
	if(x > 800) x = 0;
	if(y < 0) y = 800;
	if(y > 800) y = 0; 

    return { mass, acceleration, position:[x,y], velocity:[velocity_x,velocity_y]}
}

export default particle

export { update }

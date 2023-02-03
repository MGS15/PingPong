const COMPUTER_MAX_SPEED = .02;

export default class Paddle
{
	constructor(paddleElement) 
	{
		this.paddleElem = paddleElement;
	}
	get position() { return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position")); }
	set position(value) { this.paddleElem.style.setProperty("--position", value); }

	reset() { this.position = 50; }

	update(delta, ballPosition)
	{
		this.position += COMPUTER_MAX_SPEED * delta * (ballPosition - this.position);
	}

	rect() { return this.paddleElem.getBoundingClientRect(); }
}
import Ball from './ball.js';
import Paddle from './paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const computerScore = 0;
let lastTime;

function update(time)
{
	if (lastTime != null)
	{
		const delta = time - lastTime;
		ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
		computerPaddle.update(delta, ball.y);
		if (isLost()) loseHanler();
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
		document.documentElement.style.setProperty("--hue", hue + delta * .01);
	}
	lastTime = time;
	window.requestAnimationFrame(update)
}

function isLost()
{
	const rect = ball.rect();
	return (rect.right > window.innerWidth || rect.left <= 0)		
}

function loseHanler()
{
	const rect = ball.rect();
	if (rect.right >= window.innerWidth)
		playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
	else
		computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
	ball.reset();
	computerPaddle.reset();

}

document.addEventListener("mousemove", event => {
	playerPaddle.position = event.y / window.innerHeight * 100;
})

window.requestAnimationFrame(update);
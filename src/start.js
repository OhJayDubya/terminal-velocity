import { terminal as term } from 'terminal-kit';
import { emitKeypressEvents } from 'readline';

// Setting title of terminal
term.windowTitle('TERMINAL VELOCITY BY OWEN WRIGHT');

// Setup readline for key presses
emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Creates new asteroids to be used on the playfield
let asteroids = [];
const createAsteroid = (x, y) => {
    const asteroid = {};
    asteroid.x = x;
    asteroid.y = y;
    asteroid.sprite = '🌕';
    asteroid.x_velocity = 0;
    asteroid.y_velocity = 1;
    asteroids.push(asteroid);
}

// Added to exit the game
process.stdin.on('keypress', (str, key) => {

    // Listen to keypress event
    if (key.ctrl && key.name === 'c') {
        console.log('STOPPED', str);
        process.exit();
    }
})

// Draw function for rendering the game
const draw = () => {
    term.clear(); // Clear Buffer
    createAsteroid(Math.floor(Math.random() * 40), 0);

    console.log(asteroids);
}
setInterval(draw, 33); // 33 ms =~ 30 FPS
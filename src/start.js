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

const startGame = () => {
    return {
        x: 20,
        y: 20
    }
}

// Added to exit the game
const state = startGame();
process.stdin.on('keypress', (str, key) => {

    // Listen to keypress event
    if (key.ctrl && key.name === 'c') {
        console.log('STOPPED', str);
        process.exit();
    }
});

const createPlayer = () => {
    term.moveTo(state.x * 2, state.y, '🚀')
}

// Creates shower of asteroid sprites on playfield
const createShower = () => {
    asteroids.forEach((ast, index) => {
        term.moveTo(ast.x * 2, ast.y, ast.sprite);
        asteroids[index].y = asteroids[index].y + ast.y_velocity;

        // Clears sprites to improve performance
        if (ast.y > 40) {
            asteroids.splice(index, 1);
        }
    })
}

// Draw function for rendering the game
const draw = () => {
    term.clear(); // Clear Buffer
    createAsteroid(Math.floor(Math.random() * 40), 0);
    createPlayer();
    createShower();
}
setInterval(draw, 33); // 33 ms =~ 30 FPS
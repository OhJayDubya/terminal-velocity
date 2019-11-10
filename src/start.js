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

// Configures initial game state with all defaults
const startGame = () => {
    return {
        x: 20,
        y: 20,
        active: true,

        // Sets pressed keys back to false
        pressedKeys: {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false
        }
    }
}

const moveSpeed = 1;
const state = startGame();
process.stdin.on('keypress', (str, key) => {

    // Listen to keypress event
    if (key.ctrl && key.name === 'c') {
        console.log('STOPPED', str);
        process.exit();
    } else {

        // Keys state is all false
        state.pressedKeys= {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false
        }
    }

    // Set the state of the keys pressed in the state object
    if (key.name === 'up')  state.pressedKeys.up = true;
    if (key.name === 'down') state.pressedKeys.down = true;
    if (key.name === 'left') state.pressedKeys.left = true;
    if (key.name === 'right') state.pressedKeys.right = true;
    if (key.name === 'space') state.pressedKeys.space = true;

    // Move the player sprite based on the keys
    if(state.pressedKeys.up) state.y = state.y - moveSpeed;
    if(state.pressedKeys.down) state.y = state.y + moveSpeed;
    if(state.pressedKeys.left) state.x = state.x - moveSpeed;
    if(state.pressedKeys.right) state.x = state.x + moveSpeed;
    if(state.pressedKeys.space) state = start();
});

// Creates player sprite and places it on screen
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

        // If player and asteroid intersect set game state to false
        if (ast.x === state.x && ast.y === state.y) {
            state.active = false;
        }
    })
}

// Head up display for game messages
const HUD = () => {
    if (!state.active) {
        term.moveTo(10, 10, `GAME OVER!`)
    }
}

// Draw function for rendering the game
const draw = () => {
    term.clear(); // Clear Buffer

    // Continue to draw sprites if game is active
    if (state.active) {
        createAsteroid(Math.floor(Math.random() * 40), 0);
        createPlayer();
        createShower();
    }

    HUD();
}
setInterval(draw, 33); // 33 ms =~ 30 FPS
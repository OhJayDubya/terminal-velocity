import { terminal as term } from 'terminal-kit';
import { emitKeypressEvents } from 'readline';

// Setting title of terminal
term.windowTitle('TERMINAL VELOCITY BY OWEN WRIGHT');

// Setup readline for key presses
emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Draw function for rendering the game
const draw = () => {
    term.clear(); // Clear Buffer

    console.log('RUNNING!');
}
setInterval(draw, 33); // 33 ms =~ 30 FPS
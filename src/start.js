import { terminal as term } from 'terminal-kit';
import { emitKeypressEvents } from 'readline';

// Setting title of terminal
term.windowTitle('TERMINAL VELOCITY BY OWEN WRIGHT');

// Setup readline for key presses
emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
import path from 'path';
import ReadFile from './ReadFile';

const readFile = new ReadFile(path.join(__dirname, 'text.txt'));
readFile.read();

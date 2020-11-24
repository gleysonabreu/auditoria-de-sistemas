import path from 'path';
import ReadFile from './ReadFile';

const readFile = new ReadFile(path.join('text.txt'));
readFile.comparation('rules.txt');
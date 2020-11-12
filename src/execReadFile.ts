import path from 'path';
import ReadFile from './ReadFile';
import AddRules from './AddRules';

const readRules = new AddRules();
const rules = readRules.show();

const readFile = new ReadFile(path.join(__dirname, 'text.txt'));
readFile.comparation(rules);


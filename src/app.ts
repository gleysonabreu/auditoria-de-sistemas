import ReadFile from './classes/ReadFile';

try {
  const readFile = new ReadFile('text.txt');
  readFile.readLines(['hey']);
} catch (error) {
  console.error(error.message);
}
import ReadFile from './classes/ReadFile';

  try {
    
    const readFile = new ReadFile('text.txt');
    readFile.readLines(['Me']);

  } catch (error) {
    console.error(error);
  }
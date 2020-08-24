import File from '@classes/File';

try {
  File.readLines('text.txts');
} catch (error) {
  File.writeLines('error.txt', error.message);
}
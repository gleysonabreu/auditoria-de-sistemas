import fs from 'fs';
import path from 'path';

  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'text.txt'), 'utf8');

    if( !file ) console.error(`Empty file...`)

    const lines = file.split(/\r?\n/);

    lines.forEach(line => {
      
      if( line.includes('do') ){
        console.log(line);
      }

    })

  } catch (error) {
    
    console.error(error);

  }
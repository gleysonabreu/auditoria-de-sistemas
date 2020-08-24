import fs from 'fs';
import path from 'path'

class File {

  readLines = (pathFile: string, search?: Array<string>) => {
      const file = fs.readFileSync(path.resolve(__dirname, '..', pathFile), 'utf8');
      if(!search || search.length < 0){
        console.log(file);
        return;
      }

      const lines = file.split(/\r?\n/);
      let arrayNames: Array<string> = [];
    
      search.forEach(searchItem => {
        lines.forEach(line => {
          if(
            line.toLowerCase().includes(searchItem.toLowerCase()) 
              && 
            !arrayNames.includes(line.toLowerCase())
          ){
            console.log(line);
            arrayNames.push(line.toLowerCase());
          }
        });
      });
  }

  writeLines = (fileName: string, content: string) => {
    fs.writeFileSync(path.resolve(__dirname, '..', fileName), content);
  }
}

export default new File;
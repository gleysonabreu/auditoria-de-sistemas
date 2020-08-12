import fs from 'fs';
import path from 'path'

class ReadFile {

  private file: string;

  constructor(pathFile: string){ 
    this.file = fs.readFileSync(path.resolve(__dirname, '..', pathFile), 'utf8');
  }

  readLines = async (search?: Array<string>) => {
    
    if(search) {
      const lines = this.file.split(/\r?\n/);
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
    }else{
      console.log(this.file);
    }
  }
  

}

export default ReadFile;
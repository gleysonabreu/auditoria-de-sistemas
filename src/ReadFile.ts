import fs from 'fs';

class ReadFile {
  private file: string;
  private lines: string[];

  constructor(pathFile: string) {
    this.file = fs.readFileSync(pathFile, {
      encoding: 'utf-8'
    });
    this.lines = this.file.split(/\r?\n/);
  }

  read = () => {
    const regras: number = Number(this.lines[0]);

    console.log(`Esse arquivo contém ${regras} regras`);

    for(let line: number = 1; line <= regras; line++){
      console.log('--------------------------------------');
      console.log(`Regra ${line}`);
      this.lines[line].split(',').forEach((value: String, index: number, array: string[]) => {
        switch(index){
          case 0:
            console.log(`IP Origem: ${value}`);
            break;
          case 1:
            console.log(`IP Destino: ${value}`);
            break;
          case 2:
            console.log(`Protocolo: ${value}`);
            break;
          case 3:
            console.log(`Porta destino: ${value}`);
            break;
          case 4:
            console.log(`Ação: ${value}`);
            break;
        };
      });
    }
  };
}
export default ReadFile;

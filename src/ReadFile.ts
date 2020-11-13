import fs from 'fs';
import path from 'path';

class ReadFile {
  private file: string;
  private lines: string[];
  private rules: number;

  constructor(pathFile: string) {
    this.file = fs.readFileSync(path.join(__dirname, pathFile), 'utf-8');
    this.lines = this.file.split(/\r?\n/);
    this.rules = Number(this.lines[0]);
  }

  read = () => {

    console.log(`Esse arquivo contém ${this.rules} regras`);

    for(let line: number = 1; line <= this.rules; line++){
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
        };
      });
    }
  };

  comparation = (pathFile: string) => {
    const rulesCompare = fs.readFileSync(path.join(__dirname, pathFile), { encoding: 'utf-8' });
    const linesCompare = rulesCompare.split(/\r?\n/);

    for(let ruleX = 1; ruleX < this.lines.length; ruleX++) {
      let sourceIP = false;
      let destinationIP = false;
      let protocol = false;
      let originPort = false;
      let destinationPort = false;

      let ruleID = 0;
      let action = '';

      this.lines[ruleX].split(',').forEach((line, lineIndex) => {
        for(let compareX = 1; compareX < linesCompare.length; compareX++) {

          const lines = linesCompare[compareX].split(',');
          for(let lineX = 0; lineX < lines.length; lineX++) {

            if(lineX !== 0){
              switch(lineIndex) {
                case 0:
                  if(lines[lineX] === line || line === '*') sourceIP = true;
                  break;
                case 1:
                  if(lines[lineX] === line || line === '*') destinationIP = true;
                  break;
                case 2:
                  if(lines[lineX] === line || line === '*') protocol = true;
                  break;
                case 3:
                  if(lines[lineX] === line || line === '*') originPort = true;
                  break;
                case 4:
                  if(lines[lineX] === line || line === '*') destinationPort = true;
                  break;
              }
            }
          }

          if(
            sourceIP && destinationIP
            && protocol && originPort && destinationPort) {
              ruleID = Number(lines[0]);
              action = lines[6];
              break;
          }

        }
      });

      if(
        sourceIP && destinationIP
        && protocol && originPort && destinationPort) {
          console.log(`Comparação valida ${ruleID} - action ${action}`);
          continue;
      }else{
        console.log(`Comparação invalida`);
      }

    }
  }
}
export default ReadFile;

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
    console.log('--------------------------------------');
  };

  comparation = (pathFile: string) => {

    this.read();

    const rulesCompare = fs.readFileSync(path.join(__dirname, pathFile), { encoding: 'utf-8' });
    const linesCompare = rulesCompare.split(/\r?\n/);
    const all: string = '*';

    for(let lineX = 1; lineX <= this.rules; lineX++) {
      let sourceIP = false;
      let destinationIP = false;
      let protocol = false;
      let originPort = false;
      let destinationPort = false;

      let ruleID = 0;
      let action = '';

      const line = this.lines[lineX].split(',');

      for(let lineCompareX = 1; lineCompareX < linesCompare.length; lineCompareX++) {
        const lineCompare = linesCompare[lineCompareX].split(',');

        if(line[0] === lineCompare[1]){
          sourceIP = true;
        }
        if(line[1] === lineCompare[2]){
          destinationIP = true;
        }
        if(line[2] === lineCompare[3]){
          protocol = true;
        }
        if(line[3] === lineCompare[4]){
          originPort = true;
        }
        if(line[4] === lineCompare[5]){
          destinationPort = true;
        }

        if(
          sourceIP && destinationIP
          && protocol && originPort && destinationPort) {
            ruleID = Number(lineCompare[0]);
            action = lineCompare[6];
            break;
        }else{
           sourceIP = false;
           destinationIP = false;
           protocol = false;
           originPort = false;
           destinationPort = false;
        }
      }

      if(
        sourceIP && destinationIP
        && protocol && originPort && destinationPort) {
          console.log(
            `Regra encontrada no sistema, ID: ${ruleID} e a ação é: ${action}`
          );
          continue;
      }else{
        console.log(`O arquivo não foi afetado por nenhuma regra do firewall.`);
      }

    }
  }
}
export default ReadFile;

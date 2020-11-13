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
    const rules = sheet.filter(rule => rule.__EMPTY >= 1);

for(let line: number = 1; line <= this.rules; line++){

  let sourceIP = false;
  let destinationIP = false;
  let protocol = false;
  let originPort = false;
  let destinationPort = false;

  let ruleID = 0;
  let action = '';

  this.lines[line].split(',').forEach((ruleValue: String, ruleIndex: number) => {

    for(let n = 0; n < rules.length; n++){
      const oneRule = rules[n];

      switch(ruleIndex) {
        case 0:
          if(ruleValue === oneRule.IP || oneRule.IP === '*') sourceIP = true;
          break;
        case 1:
          if(ruleValue === oneRule.__EMPTY_1 || oneRule.__EMPTY_1 === '*') destinationIP = true;
          break;
        case 2:
          if(ruleValue === oneRule.__EMPTY_2 || oneRule.__EMPTY_2 === '*') protocol = true;
          break;
        case 3:
          if(ruleValue === oneRule.Porta || oneRule.Porta === '*') originPort = true;
          break;
        case 4:
          if(ruleValue === oneRule.__EMPTY_3 || oneRule.__EMPTY_3 === '*') destinationPort = true;
          break;
      };

      if(sourceIP && destinationIP && protocol && originPort && destinationPort){
          ruleID = Number(oneRule.__EMPTY);
          action = oneRule.__EMPTY_4;
          break;
      }
    }

  });

  if(
    sourceIP && destinationIP
    && protocol && originPort && destinationPort) {
      console.log(`Comparação valida ${ruleID} ${action}`);
      continue;
  }else{
    console.log(`Comparação invalida`);
  }

}
  }
}
export default ReadFile;

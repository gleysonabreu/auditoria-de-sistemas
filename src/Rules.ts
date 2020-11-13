import fs from 'fs';
import path from 'path';
import readline from 'readline-sync';

class Rules {
  private file: string;
  private lines: string[];
  private pathFile: string;

  private sourceIP!: string;
  private destinationIP!: string;
  private protocol!: string;
  private originPort!: string;
  private destinationPort!: string;
  private action!: string;

  constructor(pathFile: string){
    this.pathFile = path.join(__dirname, pathFile);
    this.file = fs.readFileSync(this.pathFile, {
      encoding: 'utf-8'
    });
    this.lines = this.file.split(/\r?\n/);
  }

  private input = (
    button: 'IP Origem'
    | 'IP Destino'
    | 'Protocolo'
    | 'Porta Origem'
    | 'Porta Destino'
    | 'Ação' ) => {

      switch (button){
        case 'IP Origem':
          return this.sourceIP = readline.question(`${button}: `);
        case 'IP Destino':
          return this.destinationIP = readline.question(`${button}: `);
        case 'Porta Destino':
          return this.destinationPort = readline.question(`${button}: `);
        case 'Porta Origem':
          return this.originPort = readline.question(`${button}: `);
        case 'Protocolo':
          return this.protocol = readline.question(`${button}: `);
        case 'Ação':
          return this.action = readline.question(`${button}: `);
        default:
          console.log('Button inexistente.');
          break;
      }
    };

  setInformation = () => {
    this.input('IP Origem');
    this.input('IP Destino');
    this.input('Porta Origem');
    this.input('Porta Destino');
    this.input('Protocolo');
    this.input('Ação');

    this.addRule();
  }

  private addRule() {
    const uuid = this.nextId();
    const newRule = `${uuid},${this.sourceIP},${this.destinationIP},${this.protocol},${this.originPort},${this.destinationPort},${this.action}`;
    this.lines.push(newRule);

    this.save();
  }


  deleteRule = () => {
    const id = readline.questionInt('Digite o número do id da regra que quer atualizar: ');

    const deletedRule = this.lines.filter(line => Number(line.split(',')[0]) !== id);
    this.lines = deletedRule;

    this.save();
  };

  updateRule = () => {
    const id = readline.questionInt('Digite o número do id da regra que quer atualizar: ');
    const findOne = this.lines.find(line => Number(line.split(',')[0]) === id)?.split(',');
    const findIndex = this.lines.findIndex(line => Number(line.split(',')[0]) === id);

    if(!findOne) {
      console.log('Regra não encontrada');
      return;
    }

    const updateInfos = [
      'IP Origem', 'IP Destino',
      'Protocolo', 'Porta de Origem',
      'Porta de Destino', 'Ação'
    ];
    const index = readline.keyInSelect(updateInfos, 'O que você quer alterar?');
    console.log(`Ok, você quer atualizar ${updateInfos[index]}!!`);

    switch (updateInfos[index]){
      case 'IP Origem':
        this.input('IP Origem');
        break;
      case 'IP Destino':
        this.input('IP Destino');
        break;
      case 'Protocolo':
        this.input('Protocolo');
        break;
      case 'Porta de Origem':
        this.input('Porta Origem');
        break;
      case 'Porta de Destino':
        this.input('Porta Destino');
        break;
      case 'Ação':
        this.input('Ação');
        break;
      default:
        console.log('Nada selecionado.');
    }

    findOne[1] = this.sourceIP ? this.sourceIP : findOne[1];
    findOne[2] = this.destinationIP ? this.destinationIP : findOne[2];
    findOne[3] = this.protocol ? this.protocol : findOne[3];
    findOne[4] = this.originPort ? this.originPort : findOne[4];
    findOne[5] = this.destinationPort ? this.destinationPort : findOne[5];
    findOne[6] = this.action ? this.action : findOne[6];

    this.lines[findIndex] = findOne.join(',');

    this.save();
  };

  changePosition = () => {
    const from = readline.questionInt('Digite o ID que você quer mudar a posição: ');
    const to = readline.questionInt('Trocar de posição com qual ID: ');

    const findIndexFrom = this.lines.findIndex(line => Number(line.split(',')[0]) === from);
    const findIndexTo = this.lines.findIndex(line => Number(line.split(',')[0]) === to);

    if(!findIndexFrom || !findIndexTo){
      console.log(`O ID digitado não existe.`);
      return;
    }

    this.lines.splice(findIndexTo, 0, this.lines.splice(findIndexFrom, 1)[0]);
    this.save();
  }

  private save = () => {
    const linesExpect = this.lines.join('\n');
    fs.writeFileSync(this.pathFile, linesExpect);
  }

  nextId = (): number => {
    let bigNumber: number = 1;
    let numbers: number[] = [];

    this.lines.map((line) => {
      line.split(',').map((item, index) => {
        if(index === 0){
          if(Number.isNaN(Number(item[0]))){
            numbers.push(0);
          }else{
            numbers.push(Number(item[0]));
          }
        }
      });
    });
    bigNumber = Math.max.apply(Math, numbers) + 1;

    return bigNumber;
  }

}

export default Rules;

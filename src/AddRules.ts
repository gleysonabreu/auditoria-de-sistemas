import console from 'console';
import readline from 'readline-sync';
import xlsx, { WorkBook } from 'xlsx';

interface ISheet {
  __EMPTY: string | number;
  IP: string;
  __EMPTY_1: string;
  __EMPTY_2: string;
  Porta: string;
  __EMPTY_3: string;
  __EMPTY_4: string;
}

class AddRules {
  private sourceIP!: string;
  private destinationIP!: string;
  private protocol!: string;
  private originPort!: string;
  private destinationPort!: string;
  private action!: string;

  private pathFile: string;
  private file: WorkBook;

  constructor(){
    this.pathFile = __dirname + '/Regras.xlsx';
    this.file = xlsx.readFile(this.pathFile, { type: 'array'});
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

  private addRule = () => {
    const ws = this.file.Sheets[this.file.SheetNames[0]];
    const sheetToJson: ISheet[] = xlsx.utils.sheet_to_json(ws);

    let bigNumber: number = 1;
    const numbers = sheetToJson.map((sheet) => {
      if(Number.isInteger(sheet.__EMPTY)){
        return Number(sheet.__EMPTY);
      }
      return 0;
    });
    bigNumber = Math.max.apply(Math, numbers) + 1;

    const data = {
      __EMPTY: bigNumber,
      IP: this.sourceIP,
      __EMPTY_1: this.destinationIP,
      __EMPTY_2: this.protocol,
      Porta: this.originPort,
      __EMPTY_3: this.destinationPort,
      __EMPTY_4: this.action,
    }
    sheetToJson.push(data);

    this.save(sheetToJson);
    console.log(`A nova regra foi cadastrada com sucesso.`);
  }

  deleteRule = () => {
    const id = readline.questionInt('Digite o número do id da regra para deletar: ');
    const ws = this.file.Sheets[this.file.SheetNames[0]];
    const sheetToJson: ISheet[] = xlsx.utils.sheet_to_json(ws);

    const deletedRule = sheetToJson.filter(rule => rule.__EMPTY !== id) as ISheet[];

    this.save(deletedRule);
    console.log(`A regra ${id} foi deletada com sucesso.`);
  }

  updateRule = () => {
    const ws = this.file.Sheets[this.file.SheetNames[0]];
    const sheetToJson: ISheet[]= xlsx.utils.sheet_to_json(ws);
    const id = readline.questionInt('Digite o número do id da regra que quer atualizar: ');

    const findOne = sheetToJson.find(sheet => sheet.__EMPTY === id) as ISheet;

    if(!findOne) {
      console.log(`ID: #${id}, não foi encontrado;`);
      return;
    }

    this.sourceIP = findOne.IP;
    this.destinationIP = findOne.__EMPTY_1;
    this.protocol = findOne.__EMPTY_2;
    this.originPort =findOne.Porta;
    this.destinationPort =findOne.__EMPTY_3;
    this.action = findOne.__EMPTY_4;

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

    const update = sheetToJson.map(sheet => {
      if(sheet.__EMPTY === id){
        sheet.IP = this.sourceIP;
        sheet.__EMPTY_1 = this.destinationIP;
        sheet.__EMPTY_2 = this.protocol;
        sheet.Porta = this.originPort;
        sheet.__EMPTY_3 = this.destinationPort;
        sheet.__EMPTY_4 = this.action;

        return sheet;
      }else{
        return sheet;
      }
    });

    this.save(update)
    console.log(`O ${updateInfos[index]} foi atualizado com sucesso.`);

  }

  private save(data: unknown[]){
    const toSheet = xlsx.utils.json_to_sheet(data);
    const newB = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(newB, toSheet);
    xlsx.writeFile(newB, this.pathFile);
  };

  changePosition = () => {
    const ws = this.file.Sheets[this.file.SheetNames[0]];
    const sheetToJson: ISheet[]= xlsx.utils.sheet_to_json(ws);
    const from = readline.questionInt('Digite o ID que você quer mudar a posição: ');
    const to = readline.questionInt('Trocar de posição com qual ID: ');

    const findFrom = sheetToJson.findIndex(sheet => sheet.__EMPTY === from);
    const findTo = sheetToJson.findIndex(sheet => sheet.__EMPTY === to);

    if(!findFrom || !findTo){
      console.log(`O ID digitado não existe.`);
      return;
    }

    sheetToJson.splice(findTo, 0, sheetToJson.splice(findFrom, 1)[0]);

    this.save(sheetToJson);

    console.log("Posição alterada com sucesso.");

  };
}

export default AddRules;

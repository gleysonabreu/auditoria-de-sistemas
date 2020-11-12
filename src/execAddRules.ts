import readline from 'readline-sync';
import AddRules from './AddRules';
import Rules from './Rules';

let next = 's';
const actions = [
  'Adicionar Regra',
  'Deletar Regra',
  'Atualizar Regra',
  'Mudar posição da regra'
];
console.log('-----------------------------------------------');
console.log('                CADASTRAR REGRAS               ');
console.log('-----------------------------------------------');
while(next === 's'){
  const rules = new Rules('rules.txt');

  const doWhat = readline.keyInSelect(actions, 'O que você quer fazer');

  switch(actions[doWhat]){
    case actions[0]:
      rules.setInformation();
      break;
    case actions[1]:
      rules.deleteRule();
      break;
    case actions[2]:
      rules.updateRule();
      break;
    case actions[3]:
      rules.changePosition();
      break;
    default:
      next = 'n';
      continue;
  }
  next = readline.question('Você quer continuar? (S=sim, N=não): ').substr(0,1).toLowerCase();
}
console.log('-----------------------------------------------');
console.log('             PROGRAMA FINALIZADO               ');


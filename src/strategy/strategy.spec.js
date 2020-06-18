import Acessorio from '../model/dominio/Acessorio';
import FichaTecnica from '../model/dominio/FichaTecnica';
import Produto from '../model/dominio/Produto';

import AcessorioCheckerRequired from './AcessorioCheckerRequired';
import FichaTecnicaCheckerRequired from './FichaTecnicaCheckerRequired';
import ProdutoCheckerRequired from './ProdutoCheckerRequired'

const acessorio1 = new Acessorio('espelho central', 'dispositivo de visualização posterior', 4);
const acessorio2 = new Acessorio('porta copo', 'dispositivo de portar copos', 41);
const acessorioList = [acessorio1, acessorio2];
const objExpct = {
  categoria: 'sedan',
  subCategoria: 'offroad',
  nome: 'impreza',
  descricao: 'carrão dos rally',
  componenteBasico: 'subaro impreza default',
  componentePrimario: 'kit motors offroad',
  componenteSecundario: 'caranagem de rally',
  observacoes: 'somente na cor azul',
  _acessorioList: acessorioList
};
const fichaTecnica = new FichaTecnica(...Object.values(objExpct));
const fichaTecnica2 = new FichaTecnica(...Object.values(objExpct));

const objExpctToProduto = {
  nome: 'subaru imprenza sxz',
  valor: 123000.00,
  dataEntrada: 1591562332197,
  quantidade: 6,
  funcionario: 'José das Neves',
  _fichaTecnica: fichaTecnica
}

const produto = new Produto(...Object.values(objExpctToProduto));
const produto2 = new Produto(...Object.values(objExpctToProduto));

describe('AcessorioCheckerRequired', () => {
  it('should returned result without errors', () => {
    const checker = new AcessorioCheckerRequired();
    const { mensagem, erro} = checker.processar(acessorio1);

    expect(mensagem).toMatch(/sucesso/i);
    expect(erro).toEqual(0);
  });

  it('should returned result with errors', () => {
    const checker = new AcessorioCheckerRequired();
    const acessorio3 = {...acessorio1,nome: undefined, descricao: null};
    const { mensagem, erro} = checker.processar(acessorio3);

    expect(mensagem).toMatch(/nome não pode ser vazio[\W|\w]*descricao não pode ser vazio/ig);
    expect(erro).toEqual(1);
  });
});

describe('FichaTecnicaCheckerRequired', () => {
  it('should returned result without errors', () => {
    const checker = new FichaTecnicaCheckerRequired();
    const { mensagem, erro} = checker.processar(fichaTecnica);

    expect(mensagem).toMatch(/sucesso/i);
    expect(erro).toEqual(0);
  });

  it('should returned result with errors', () => {
    const checker = new FichaTecnicaCheckerRequired();
    const fichaTecnica3 = {...fichaTecnica,nome: undefined};
    fichaTecnica3._acessorioList = [new Acessorio('espelho central', null, 4)];
    const { mensagem, erro} = checker.processar(fichaTecnica3);

    expect(mensagem).toMatch(/nome não pode ser vazio[\W|\w]*descricao não pode ser vazio/ig);
    expect(erro).toEqual(1);
  });
});

describe('ProdutoCheckerRequired', () => {
  it('should returned result without errors', () => {
    const checker = new ProdutoCheckerRequired();
    const { mensagem, erro} = checker.processar(produto2);

    expect(mensagem).toMatch(/sucesso/i);
    expect(erro).toEqual(0);
  });

  it('should returned result with errors', () => {
    const checker = new ProdutoCheckerRequired();
    const produto3 = {...produto, nome: undefined};
    produto3._fichaTecnica.observacoes = undefined;
    produto3._fichaTecnica._acessorioList[1].descricao = undefined
    const { mensagem, erro} = checker.processar(produto3);

    expect(mensagem).toMatch(/nome não pode ser vazio[\W|\w]*descricao não pode ser vazio/ig);
    expect(erro).toEqual(1);
  });
});
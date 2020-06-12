import FichaTecnica from './FichaTecnica';
import Acessorio from './Acessorio';
import Produto from './Produto';

const acessorio = new Acessorio('espelho central', 'dispositivo de visualização posterior', 4);
const acessorioList = [acessorio, acessorio];
const fichaTecnica = new FichaTecnica (
  'sedan',
  'offroad',
  'impreza',
  'carrão dos rally',
  'subaro impreza default',
  'kit motors offroad',
  'caranagem de rally',
  'somente na cor azul',
  acessorioList
);
const objExpct = {
  nome: 'subaru imprenza sxz',
  valor: 123000.00,
  dataEntrada: 1591562332197,
  quantidade: 6,
  funcionario: 'José das Neves',
  _fichaTecnica: fichaTecnica
}

describe('Produto class', () => {
  it('should create one object instance of Produto', () => {
    const produto = new Produto();
    expect(produto instanceof Produto).toBe(true);
  });

  it('should contain properties of Produto and return values seted', () => {
    const produto = new Produto(...Object.values(objExpct));
    expect(Object.keys(produto)).toEqual(Object.keys(objExpct));
    expect(Object.values(produto)).toEqual(Object.values(objExpct));
  });

  it('should has accessor methods to fichaTecnica atribute', () => {
    let objExpctWithoutFichaTecnica = objExpct;
    delete objExpctWithoutFichaTecnica['_fichaTecnica'];
    const produto = new Produto(...Object.values(objExpctWithoutFichaTecnica));
    const oldValueOfFichaTecnica = produto._fichaTecnica;
    produto.fichaTecnica = fichaTecnica;
    expect(produto._fichaTecnica).not.toEqual(oldValueOfFichaTecnica);
    expect(produto.fichaTecnica).toEqual(fichaTecnica)
  })

});

import FichaTecnica from './FichaTecnica';
import Acessorio from './Acessorio';

const acessorio = new Acessorio('espelho central', 'dispositivo de visualização posterior', 4);
const acessorioList = [acessorio, acessorio];
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

describe('FichaTecnica class', () => {
  it('should create one object instance of FichaTecnica', () => {
    const fTecnica = new FichaTecnica(...Object.values(objExpct));
    expect(fTecnica instanceof FichaTecnica).toBe(true);
  });

  it('should contain properties of FichaTecnica and return values seted', () => {
    const fTecnica = new FichaTecnica(...Object.values(objExpct));
    expect(Object.keys(fTecnica)).toEqual(Object.keys(objExpct));
    expect(Object.values(fTecnica)).toEqual(Object.values(objExpct));
  });

  it('should allow use construct without AcessorioList param and add after', () => {
    let obtExpctWithoutAcessorioList = Object;
    delete obtExpctWithoutAcessorioList['_acessorioList'];
    const fTecnica = new FichaTecnica(...Object.values(obtExpctWithoutAcessorioList));
    expect(fTecnica.acessorioList).toHaveLength(0);
    const oldLen = fTecnica.acessorioList.length;
    fTecnica.addAcessorio(acessorio);
    expect(fTecnica.acessorioList).toHaveLength(oldLen + 1);
  });

  it('should has addAcessorio method', () => {
    const fTecnica = new FichaTecnica(...Object.values(objExpct));
    expect(typeof fTecnica.addAcessorio).toEqual('function');
  });

  it('should add acessorio in _acessorioList when method addAcessorio called with objAcessorio as argument', () => {
    const fTecnica = new FichaTecnica(...Object.values(objExpct));
    const oldLen = fTecnica.acessorioList.length;
    fTecnica.addAcessorio(acessorio);
    expect(fTecnica.acessorioList).toHaveLength(oldLen + 1);
  });
});
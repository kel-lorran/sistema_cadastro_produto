import Acessorio from './Acessorio';

describe('Acessorio class', () => {
  it('should return acessorio obj when new Acessorio called', () => {
    const objExpct = {"nome": "espelho central", "descricao": "dispositivo de visualização posterior", "quantidade": 4}
    const acessorio = new Acessorio(...Object.values(objExpct));
    expect( acessorio instanceof Acessorio).toBe(true);
    expect(Object.keys(acessorio)).toEqual(Object.keys(objExpct));
    expect(Object.values(acessorio)).toEqual(Object.values(objExpct));
  });
});
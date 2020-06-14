import FichaTecnicaDAO from './FichaTecnicaDAO';
import FichaTecnica from '../../dominio/FichaTecnica';
import Acessorio from '../../dominio/Acessorio';

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

describe('FichaTecnicaDAO service of persistence', () => {
  describe('criar method', () => {
    it('should exists this method', () => {
      const dao = new FichaTecnicaDAO();
      expect(dao).toBeInstanceOf(FichaTecnicaDAO);
      expect(dao.criar).toBeDefined();
    });

    it('should return Result with Ficha Tecnica contain id returned after save in db and Acessorios with id', async () => {
      const dao = new FichaTecnicaDAO();
      const result = await dao.criar(fichaTecnica);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id.toString()).toMatch(/^[\d]+$/);
    });
  });

  describe.skip('alterar method', () => {
    it('should exists this method', () => {
      const dao = new FichaTecnicaDAO();
      expect(dao).toBeInstanceOf(FichaTecnicaDAO);
      expect(dao.alterar).toBeDefined();
    });

    it('should return one FichaTecnica with atributes updated', async () => {
      const randomNum = (Math.random()*100).toFixed(0);
      const oldNome = fichaTecnica2.nome;
      fichaTecnica2.id = 2;
      fichaTecnica2.nome += randomNum
      const dao = new FichaTecnicaDAO();
      const result = await dao.alterar(fichaTecnica2);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].nome).toEqual(`${oldNome}${randomNum}`);
    });

    it('should return one FichaTecnica with acessorioList increment', async () => {
      const oldLenListAcessorio = fichaTecnica2.acessorioList.length;
      const acessorio3 = new Acessorio('porta copo', 'dispositivo de portar copos', 41);
      fichaTecnica2.addAcessorio(acessorio3);
      const dao = new FichaTecnicaDAO();
      const result = await dao.alterar(fichaTecnica2);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].acessorioList).toHaveLength(oldLenListAcessorio + 1);
    });

    it('should return one FichaTecnica with acessorioList decrement', async () => {
      const oldLenListAcessorio = fichaTecnica2.acessorioList.length;
      fichaTecnica2.removeAcessorio((e, i) => i );
      const dao = new FichaTecnicaDAO();
      const result = await dao.alterar(fichaTecnica2);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].acessorioList).toHaveLength(oldLenListAcessorio - 1);
    });
  });

  describe('consultar method', () => {
    it('should exists this method', () => {
      const dao = new FichaTecnicaDAO();
      expect(dao).toBeInstanceOf(FichaTecnicaDAO);
      expect(dao.consultar).toBeDefined();
    });
    
    it('should return all FichaTecnica when called without param', async () => {
      const dao = new FichaTecnicaDAO();
      const result = await dao.consultar();
      expect(result.erro).toEqual(0);
      expect(result.data.length > 1).toBe(true);
      expect(result.data[0]).toBeInstanceOf(FichaTecnica);
    });
  });

  describe.only('excluir method', () => {
    it('should exists this method', () => {
      const dao = new FichaTecnicaDAO();
      expect(dao).toBeInstanceOf(FichaTecnicaDAO);
      expect(dao.excluir).toBeDefined();
    });
    it('should delete element by id', async () => {
      const dao = new FichaTecnicaDAO();
      let {erro,data:[{id}]} = await dao.criar(fichaTecnica);
      expect(erro).toEqual(0);

      const result = await dao.excluir(id);
      expect(result.erro).toEqual(0);
      const {data} = await dao.consultar({id});
      expect(data.length).toEqual(0);
    });
  });
});
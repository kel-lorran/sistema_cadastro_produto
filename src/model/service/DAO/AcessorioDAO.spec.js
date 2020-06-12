import AcessorioDAO from './AcessorioDAO';
import Acessorio from '../../dominio/Acessorio';
//import Result from '../../../utils/Result';

const acessorio = new Acessorio('espelho central', 'dispositivo de visualização posterior', 4);
const acessorio2 = new Acessorio('step traseito', 'kit de step aparente fixado no porta-malas', 1999);

describe('AcessorioDAO service of persistence', () => {
  describe.skip('criar method', () => {
    it('should exists this method', () => {
      const dao = new AcessorioDAO();
      expect(dao).toBeInstanceOf(AcessorioDAO);
      expect(dao.criar).toBeDefined();
    });
    
    it('should return Result with Acessorio contain id returned after save in db', async () => {
      const dao = new AcessorioDAO();
      const result = await dao.criar(acessorio);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id.toString()).toMatch(/^[\d]+$/);
    });
  });
  describe('alterar method', () => {
    it('should exists this method', () => {
      const dao = new AcessorioDAO();
      expect(dao).toBeInstanceOf(AcessorioDAO);
      expect(dao.alterar).toBeDefined();
    })

    it('should return one Acessorio with atributes updated', async () => {
      const dao = new AcessorioDAO();
      acessorio2.id = 2;
      acessorio2.nome += (Math.random()*100).toFixed(0);
      const result = await dao.alterar(acessorio2);
      expect(result.erro).toEqual(0);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(acessorio2);
    });

    it('should throw exception \'operation update without where condition in table acessorio deny\'', async () => {
      let exceptionMessage = '';
      const dao = new AcessorioDAO();
      acessorio2.id = null;
      dao.alterar(acessorio2)
        .catch(error => exceptionMessage = error)
        .finally(() => expect(exceptionMessage).toEqual('operation update without where condition in table acessorio deny'));
      
      acessorio2.id = 2;
    });
  });
  describe('consultar method', () => {
    it('should exists this method', () => {
      const dao = new AcessorioDAO();
      expect(dao).toBeInstanceOf(AcessorioDAO);
      expect(dao.consultar).toBeDefined();
    });

    it('should return all acessorio when called without parameters', async () => {
      const dao = new AcessorioDAO();
      const result = await dao.consultar();
      console.log('total de acessorios no banco ---->', result.data.length);
      expect(result.erro).toEqual(0);
      expect(result.data.length > 1).toBeTruthy();
      expect(result.data[0]).toBeInstanceOf(Acessorio);
    });

    it('should return selected acessorio by id', async () => {
      const dao = new AcessorioDAO();
      const result = await dao.consultar({ id: 3 });
      expect(result.erro).toEqual(0);
      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(3);
    });
    
    it('should return selected acessorio by other atribute', async () => {
      const dao = new AcessorioDAO();
      const result = await dao.consultar({ descricao: 'kit de step aparente fixado no porta-malas', quantidade: 4});
      expect(result.erro).toEqual(0);
      expect(result.data.length > 1).toBe(true);
      expect(result.data.map( ace => ace.quantidade).includes(4)).toBe(true);
      expect(result.data.map( ace => ace.descricao).includes('kit de step aparente fixado no porta-malas')).toBe(true);
    });
  });

  describe('excluir method', () => {
    it('should exists this method', () => {
      const dao = new AcessorioDAO();
      expect(dao).toBeInstanceOf(AcessorioDAO);
      expect(dao.excluir).toBeDefined();
    });

    it.skip('should delete item by id', async () => {
      const dao = new AcessorioDAO();
      const result =  await dao.excluir(1);
      expect(result.erro).toEqual(0);
      expect((await dao.consultar({id: 5})).data).toHaveLength(0)
    });
  });
});
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
      console.log(result.data[0].acessorioList);
    });
  });
});
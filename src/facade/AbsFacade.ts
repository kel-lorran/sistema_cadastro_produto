import IStrategy from '../strategy/IStrategy';
import IDAO from '../model/service/DAO/IDAO';
import ProdutoCheckerRequired from '../strategy/ProdutoCheckerRequired';
import Produto from '../model/dominio/Produto';
import ProdutoDAO from '../model/service/DAO/ProdutoDAO';

export default abstract class AbsFacade {
  regras: Map<string, Map<string, IStrategy[]>>;
  daos: Map<string, IDAO>;
  constructor() {
    this.regras = new Map();
    this.daos = new Map();

    const regrasCriarProduto = [new ProdutoCheckerRequired()];
    const regrasAlterarProduto = [new ProdutoCheckerRequired()];
    const regrasConsultarProduto = [];
    const regrasExcluirProduto = [];

    const regrasProduto: Map<string, IStrategy[]> = new Map();

    regrasProduto.set('criar', regrasCriarProduto);
    regrasProduto.set('alterar', regrasAlterarProduto);
    regrasProduto.set('consultar', regrasConsultarProduto);
    regrasProduto.set('excluir', regrasExcluirProduto);
    
    this.regras.set(Produto.constructor.name, regrasProduto);

    this.daos.set(Produto.constructor.name, new ProdutoDAO());
  } 
}
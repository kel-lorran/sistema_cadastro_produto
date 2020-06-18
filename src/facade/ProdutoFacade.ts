import IFacade from './IFacade';
import Result from '../utils/Result';

import Produto from '../model/dominio/Produto';

import ProdutoDAO from '../model/service/DAO/ProdutoDAO';
import ProdutoCheckerRequired from '../strategy/ProdutoCheckerRequired';


export default class ProdutoFacade implements IFacade {
  async criar(produto: Produto): Promise<Result> {
    const dao = new ProdutoDAO();
    const checker = new ProdutoCheckerRequired();
    let result: Result;
    try{
      result = checker.processar(produto);
      if(!result.erro) {
        result = await dao.criar(produto);
      }
    } catch(erro) {
      result.mensagem = erro;
    } finally {
      return result
    }
  }

  async consultar(objParcialProduto: Partial<Produto>): Promise<Result> {
    const dao = new ProdutoDAO();
    let result = new Result('falha ao consultar', 1);
    try{
      result = await dao.consultar(objParcialProduto as Produto);
    } catch(erro) {
      result.mensagem = erro;
    } finally {
      return result
    }
  }

  async alterar(produto: Produto): Promise<Result> { 
      const dao = new ProdutoDAO();
      const checker = new ProdutoCheckerRequired();
      let result: Result;
      try{
        result = checker.processar(produto);
        if(!result.erro) {
          result = await dao.alterar(produto);
        }
      } catch(erro) {
        result.mensagem = erro;
      } finally {
        return result
      }
  }

  async excluir(id: number): Promise<Result> {
    const dao = new ProdutoDAO();
    let result = new Result('falha ao alterar', 1);
    try{
      result = await dao.excluir(id);
    } catch(erro) {
      result.mensagem = erro;
    } finally {
      return result
    }
  }
}
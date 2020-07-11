import IFacade from './IFacade';
import Result from '../utils/Result';

import Produto from '../model/dominio/Produto';

import ProdutoDAO from '../model/service/DAO/ProdutoDAO';
import ProdutoCheckerRequired from '../strategy/ProdutoCheckerRequired';
import AbsFacade from './AbsFacade';


export default class ProdutoFacade extends AbsFacade implements IFacade {
  async criar(produto: Produto): Promise<Result> {
    const className = Produto.constructor.name;
    const dao = this.daos.get(className);
    const regras = this.regras.get(className).get('criar');
    let result: Result = new Result('');

    try{
      regras.forEach(e => {
        const { mensagem, erro, data} = e.processar(produto);
        result.mensagem += mensagem + '/n';
        result.erro += erro;
        result.data.push(...data);
      })
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
    const className = Produto.constructor.name;
    const dao = this.daos.get(className);
    const regras = this.regras.get(className).get('consultar');
    let result: Result = new Result('');

    try{
      regras.forEach(e => {
        const { mensagem, erro, data} = e.processar(objParcialProduto as Produto);
        result.mensagem += mensagem + '/n';
        result.erro += erro;
        result.data.push(...data);
      })
      if(!result.erro) {
        result = await dao.consultar(objParcialProduto as Produto);
      }
    } catch(erro) {
      result.mensagem = erro;
    } finally {
      return result
    }
  }

  async alterar(produto: Produto): Promise<Result> { 
    const className = Produto.constructor.name;
    const dao = this.daos.get(className);
    const regras = this.regras.get(className).get('alterar');
    let result: Result = new Result('');

    try{
      regras.forEach(e => {
        const { mensagem, erro, data} = e.processar(produto as Produto);
        result.mensagem += mensagem + '/n';
        result.erro += erro;
        result.data.push(...data);
      });
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
    const className = Produto.constructor.name;
    const dao = this.daos.get(className);
    const regras = this.regras.get(className).get('excluir');
    let result: Result = new Result('');

    try{
      regras.forEach(e => {
        const { mensagem, erro, data} = e.processar({id} as Produto);
        result.mensagem += mensagem + '/n';
        result.erro += erro;
        result.data.push(...data);
      });
      if(!result.erro) {
        result = await dao.excluir(id);
      }
    } catch(erro) {
      result.mensagem = erro;
    } finally {
      return result
    }
  }
}
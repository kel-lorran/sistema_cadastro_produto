import Result from '../utils/Result'

export default class ProdutoFacade{
  criar(dataJson: string): Result{
    const resultTemp = new Result();
    resultTemp.mensagem = 'teste';
    return resultTemp;
  }
}
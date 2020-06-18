import Result from '../utils/Result';
import EntidadeDominio from '../model/dominio/EntidadeDominio'

export default interface IFacade {
   criar(produto: EntidadeDominio): Promise<Result>
   consultar(objParcialProduto: Partial<EntidadeDominio>): Promise<Result>
   alterar(produto: EntidadeDominio): Promise<Result>
   excluir(id: number): Promise<Result>
}
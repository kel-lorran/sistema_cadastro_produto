import EntidadeDominio from '../../dominio/EntidadeDominio';
import Result from '../../../utils/Result';

export default interface IDAO {
  criar(entidade: EntidadeDominio): Promise<Result>;
  alterar(entidade: EntidadeDominio): Promise<Result>;
  excluir(id: number): Promise<Result>;
  consultar(entidade: EntidadeDominio): Promise<Result>;
}
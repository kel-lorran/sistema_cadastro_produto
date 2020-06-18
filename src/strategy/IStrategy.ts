import Result from '../utils/Result';
import EntidadeDominio from '../model/dominio/EntidadeDominio';

export default interface IStrategy {
  processar(entidade: EntidadeDominio): Result
}
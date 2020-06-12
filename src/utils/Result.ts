import EntidadeDominio from '../model/dominio/EntidadeDominio';

export default class Result{
  mensagem: string;
  erro: number;
  data: EntidadeDominio[];
  constructor(mensagem: string, erro:number = 0, data:EntidadeDominio[] = []) {
    this.mensagem = mensagem;
    this.erro = erro;
    this.data = data;
  }
}
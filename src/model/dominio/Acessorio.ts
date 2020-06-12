import EntidadeDominio from './EntidadeDominio';

export default class Acessorio extends EntidadeDominio {
  nome: string;
  descricao: string;
  quantidade: number;
  constructor(nome: string, descricao: string, quantidade: number){
    super();
    this.nome = nome;
    this.descricao = descricao;
    this.quantidade = quantidade;
  }
}
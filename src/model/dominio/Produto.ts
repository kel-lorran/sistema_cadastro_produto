import FichaTecnica from './FichaTecnica';
import EntidadeDominio from './EntidadeDominio';

export default class Produto extends EntidadeDominio {
  nome: string;
  valor: number;
  dataEntrada: number;
  quantidade: number;
  funcionario: string;
  private _fichaTecnica: FichaTecnica | undefined
  constructor(
    nome: string,
    valor: number,
    dataEntrada: number,
    quantidade: number,
    funcionario: string,
    fichaTecnica: FichaTecnica | undefined = undefined
  ) {
    super();
    this.nome = nome,
    this.valor = valor,
    this.dataEntrada = dataEntrada,
    this.quantidade = quantidade,
    this.funcionario = funcionario,
    this._fichaTecnica = fichaTecnica 
  }
  get fichaTecnica(){
    return this._fichaTecnica;
  }
  set fichaTecnica(newValue: FichaTecnica){
    this._fichaTecnica = newValue
  }
}
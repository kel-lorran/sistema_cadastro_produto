import FichaTecnica from './FichaTecnica';
import EntidadeDominio from './EntidadeDominio';

export default class Produto extends EntidadeDominio {
  status: boolean;
  nome: string;
  valor: number;
  dataEntrada: number | undefined;
  quantidade: number;
  comprador: string;
  private _fichaTecnica: FichaTecnica | undefined
  constructor(
    status: boolean,
    nome: string,
    valor: number,
    dataEntrada: number | undefined,
    quantidade: number,
    comprador: string,
    fichaTecnica: FichaTecnica | undefined = undefined
  ) {
    super();
    this.status = status;
    this.nome = nome,
    this.valor = valor,
    this.dataEntrada = dataEntrada,
    this.quantidade = quantidade,
    this.comprador = comprador,
    this._fichaTecnica = fichaTecnica 
  }
  get fichaTecnica(){
    return this._fichaTecnica;
  }
  set fichaTecnica(newValue: FichaTecnica){
    this._fichaTecnica = newValue
  }
}
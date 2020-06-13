import Acessorio from './Acessorio';
import EntidadeDominio from './EntidadeDominio';

export default class FichaTecnica extends EntidadeDominio {
  categoria: string;
  subCategoria: string;
  nome: string;
  descricao: string;
  componenteBasico: string;
  componentePrimario: string;
  componenteSecundario: string;
  observacoes: string;
  private _acessorioList: Acessorio[]
  constructor(
    categoria: string,
    subCategoria: string,
    nome: string,
    descricao: string,
    componenteBasico: string,
    componentePrimario: string,
    componenteSecundario: string,
    observacoes: string,
    acessorios: Acessorio[] | undefined = []
  ) {
    super();
    this.categoria = categoria,
    this.subCategoria = subCategoria,
    this.nome = nome,
    this.descricao = descricao,
    this.componenteBasico = componenteBasico,
    this.componentePrimario = componentePrimario,
    this.componenteSecundario = componenteSecundario,
    this.observacoes = observacoes,
    this._acessorioList = acessorios
  }
  get acessorioList() {
    return this._acessorioList;
  }
  set acessorioList(newValue: Acessorio[]) {
    this._acessorioList = newValue;
  }
  addAcessorio(newAcessorio: Acessorio) {
    this._acessorioList.push(newAcessorio)
  }
  removeAcessorio(callback: (e: Acessorio, i: number) => Acessorio) {
    this._acessorioList = this._acessorioList.filter(callback)
  }
}
import IDAO from './IDAO';
import AcessorioDAO from './AcessorioDAO'
import ConnectionFactory from './ConnectionFactory';
import FichaTecnica from '../../dominio/FichaTecnica';
import Acessorio from '../../dominio/Acessorio';
import Result from '../../../utils/Result';

export default class FichaTecnicaDAO implements IDAO {
  con: any;
  constructor(){
    this.con = ConnectionFactory.criar()
  }
  async criar(f: FichaTecnica): Promise<Result> {
    debugger;
    const pFicha = this.con('ficha_tecnica')
      .insert(this.converToDb(f));

    const pAcessorios = f.acessorioList
      .map(a => (new AcessorioDAO()).criar(a));

    const [[fic_id], ...resultList] = await Promise.all([pFicha,...pAcessorios]);   
    f.acessorioList = resultList.reduce((acc, result) => [...acc,...result.data],[]);
    debugger;
    const pRelacionamento = f.acessorioList
      .map( ({ id }) => {
        return this.con('ficha_tecnica_acessorio')
          .insert({ace_id: id, fic_id})
      });
    
    const anyReturn = await Promise.all(pRelacionamento);

    f.id = fic_id;

    const result = new Result(
      anyReturn.length === f.acessorioList.length ? 'sucesso' : 'falha',
      anyReturn.length === f.acessorioList.length ? 0 : 1,
      [f]
    );
    return result;
  }
  converToDb(f: FichaTecnica){
    const objDb = {};
    f.nome && (objDb['fic_nome'] = f.nome);
    f.categoria && (objDb['fic_categoria'] = f.categoria);
    f.subCategoria && (objDb['fic_subcategoria'] = f.subCategoria);
    f.descricao && (objDb['fic_descricao'] = f.descricao);
    f.componenteBasico && (objDb['fic_componente_basico'] = f.componenteBasico);
    f.componentePrimario && (objDb['fic_componente_primario'] = f.componentePrimario);
    f.componenteSecundario && (objDb['fic_componente_secundario'] = f.componenteSecundario);
    f.observacoes && (objDb['fic_observacoes'] = f.observacoes);
    return objDb
  }
  converToDominio({
    fic_id: id,
    fic_categoria: categoria,
    fic_subcategoria: subcategoria,
    fic_nome: nome,
    fic_descricao: descricao,
    fic_componente_basico: componente_basico,
    fic_componente_primario: componente_primario,
    fic_componente_secundario: componente_secundario,
    fic_observacoes: observacoes,
  }){
    const f = new FichaTecnica(
      categoria,
      subcategoria,
      nome,
      descricao,
      componente_basico,
      componente_primario,
      componente_secundario,
      observacoes,
    );
    f.id = id;
    return f;
  }
}
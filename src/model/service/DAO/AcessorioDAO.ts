import IDAO from './IDAO';
import ConnectionFactory from './ConnectionFactory';
import Acessorio from '../../dominio/Acessorio';
import Result from '../../../utils/Result';


export default class AcessorioDAO implements IDAO {
  con: any;
  constructor(){
    this.con = ConnectionFactory.criar()
  }
  async criar(a: Acessorio): Promise<Result> {
    const [ace_id] = await this.con('acessorio')
      .insert(this.converToDb(a));
    a.id = ace_id
    const result = new Result(
      ace_id ? 'sucesso' : 'falha',
      ace_id ? 0 : 1,
      [a]
    );
    return result;
  }
  async consultar(a: Acessorio | undefined): Promise<Result> {
    let objAtributeFilter = {};
    const arrTemp = []
    if(!a){
      arrTemp.push(...await this.con('acessorio').select('*'));
    } else if(a.id) {
      arrTemp.push(
        ...await this.con('acessorio')
          .select('*')
          .where({ ace_id: a.id })
      );
    } else {
      arrTemp.push(
        ...await Object.entries(this.converToDb(a))
          .filter( e => !!e[1])
          .reduce(
            (acc, entrie, index) => {
              let condition = 'orWhere';
              if(!index){
                condition = 'where';
              }
              return acc[condition](entrie[0], 'like', `%${entrie[1]}%`);
            },
            this.con('acessorio').select('*')
          )
      );
    }

    return new Result(
      arrTemp instanceof Array ? 'sucesso' : 'falha',
      arrTemp instanceof Array ? 0 : 1,
      [...arrTemp.map(this.converToDominio)]
    );
  }
  async alterar(a: Acessorio): Promise<Result> {
    if(!a.id){
      throw 'operation update without where condition in table acessorio deny';
    }
    const flag = await this.con('acessorio')
      .where({ ace_id: a.id})
      .update(this.converToDb(a),['ace_id']);
    return new Result(
      flag ? 'sucesso' : 'falha',
      flag ? 0 : 1,
      [a]
    );
  }
  async excluir(id: number): Promise<any>{
    if(!id){
      throw 'operation delete without where id in table acessorio deny';
    }
    const flag = await this.con('acessorio')
      .where({ace_id: id})
      .del();

    return new Result(
      flag ? 'sucesso' : 'falha',
      flag ? 0 : 1,
      []
    );
  }
  converToDb(a: Acessorio){
    const objDb = {};
    a.nome && (objDb['ace_nome'] = a.nome);
    a.descricao && (objDb['ace_descricao'] = a.descricao);
    a.quantidade && (objDb['ace_quantidade'] = a.quantidade);
    return objDb
  }
  converToDominio({
    ace_id: id,
    ace_nome: nome,
    ace_descricao: descricao,
    ace_quantidade: quantidade
  }){
    const acessorio = new Acessorio(nome, descricao, quantidade);
    acessorio.id = id;
    return acessorio;
  }
}
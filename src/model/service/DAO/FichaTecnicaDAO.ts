import IDAO from './IDAO';
import AcessorioDAO from './AcessorioDAO'
import ConnectionFactory from './ConnectionFactory';
import FichaTecnica from '../../dominio/FichaTecnica';
import Result from '../../../utils/Result';

type operation = 'criar' | 'deletar' | 'consultar';

export default class FichaTecnicaDAO implements IDAO {
  con: any;
  constructor(){
    this.con = ConnectionFactory.criar()
  }
  async criar(f: FichaTecnica): Promise<Result> {
    const pFicha = this.con('ficha_tecnica')
      .insert(this.converToDb(f));

    const pAcessorios = f.acessorioList
      .map(a => {
        const dao = new AcessorioDAO();
        if(a.id){
          return dao.alterar(a)
        }
        return dao.criar(a)
      });

    const [[fic_id], ...resultList] = await Promise.all([pFicha,...pAcessorios]);   
    f.acessorioList = resultList.reduce((acc, result) => [...acc,...result.data],[]);
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
  async alterar(f: FichaTecnica): Promise<Result> {
    if(!f.id){
      throw 'operation update without where condition in table fichaTecnica deny';
    }
    const pFicha = this.con('ficha_tecnica')
    .where({ fic_id: f.id})
    .update(this.converToDb(f),['fic_id']);
    
    const pRelacionamento = this.con('ficha_tecnica_acessorio')
    .select('*')
    .where({ fic_id: f.id})
    .then(data => new Set(data.map(e => e.ace_id)));
    
    
    const [flag,resToDeleteAcessorio] = await Promise.all([pFicha,pRelacionamento]);
    const restToCreateRelacionamento = new Set(f.acessorioList.map(({id}) => id).filter(e => e));
    
    const acessorioDao = new AcessorioDAO();
    const arrResults = await f.acessorioList.map(a => {
      if(a.id && resToDeleteAcessorio.has(a.id)){
        resToDeleteAcessorio.delete(a.id);
        restToCreateRelacionamento.delete(a.id)
        return acessorioDao.alterar(a);
      } else if (a.id) {
        return acessorioDao.alterar(a);
      }
      return acessorioDao.criar(a)
      .then((result) => {
        const ace_id = result.data[0].id;
        restToCreateRelacionamento.add(ace_id);
        return result
      });
    });
    
    const pDeleteAcessorio = []
    for (let ace_id of resToDeleteAcessorio){
      pDeleteAcessorio.push(acessorioDao.excluir(ace_id));
      pDeleteAcessorio.push(this.maniupulaRelacionamento('deletar',{ ace_id }))
    }
    
    
    const anyReturn = await Promise.all([...arrResults,...pDeleteAcessorio]);
    
    const pCriarRelacionamento = []
    for (let ace_id of restToCreateRelacionamento){
      pCriarRelacionamento.push(
        this.maniupulaRelacionamento('criar',{ ace_id, fic_id: f.id})
      );
    }
      
    const anotherAnyReturn  = await Promise.all(pCriarRelacionamento);
      
    return new Result(
      'sucesso',
      0,
      [f]
    );
  }

  async consultar(f: FichaTecnica | undefined): Promise<Result> {
    let objAtribute = {};
    const arrTemp: FichaTecnica[] = [];
    if(!f){
      arrTemp.push(
        ...await this.con('ficha_tecnica')
          .select('*')
          .then(data => data.map( f => this.converToDominio(f)))
      );
    } else if(f.id) {
      arrTemp.push(
        ...await this.con('ficha_tecnica')
          .select('*')
          .where({ fic_id: f.id})
          .then(data => data.map( f => this.converToDominio(f)))
      );
    } else {
      arrTemp.push(
        ...await Object.entries(this.converToDb(f))
          .filter( e => !!e[1])
          .reduce(
            (acc, entrie, index) => {
              let condition = 'orWhere';
              if(!index){
                condition = 'where';
              }
              return acc[condition](entrie[0], 'like', `%${entrie[1]}%`);
            },
            this.con('ficha_tecnica').select('*')
          )
      );
    }

    const pAcessorrioList = arrTemp.map(f => {
      const acessorioDao = new AcessorioDAO();
      return this.con('ficha_tecnica')
        .where('ficha_tecnica.fic_id','=',f.id)
        .select('ficha_tecnica.fic_id')
        .join('ficha_tecnica_acessorio','ficha_tecnica.fic_id','ficha_tecnica_acessorio.fic_id')
        .join('acessorio','ficha_tecnica_acessorio.ace_id', 'acessorio.ace_id')
        .select('acessorio.*')
        .then( data => data.map(a => f.addAcessorio( acessorioDao.converToDominio(a))))
    });

    await Promise.all(pAcessorrioList);

    return new Result(
      'sucesso',
      0,
      arrTemp
    );
  }

  async excluir(id: number): Promise<Result> {
    if(!id){
      throw 'operation delete without where id in table fichaTecnica deny';
    }

    const flag = await this.con('ficha_tecnica_acessorio')
      .where('ficha_tecnica_acessorio.fic_id',id)
      .del()
      .then( async flag => {
        if(!flag){
          return flag;
        }
        return await this.con('ficha_tecnica')
          .where('ficha_tecnica.fic_id', id)
          .del()
      });

    return new Result(
      flag ? 'sucesso' : 'falha',
      flag ? 0 : 1,
      []
    );
  }

  maniupulaRelacionamento(o: operation, { ace_id, fic_id}:any){
    switch (o) {
      case 'deletar':
        return this.con('ficha_tecnica_acessorio')
          .where({ace_id})
          .del();
        break;
      case 'consultar':
        const obj:any = {}
        ace_id && (obj.ace_id = ace_id);
        fic_id && (obj.fic_id = fic_id);
        return this.con('ficha_tecnica_acessorio')
          .where({obj});
      case 'criar':
        return this.con('ficha_tecnica_acessorio')
          .insert({ ace_id, fic_id});
        break;
    }
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
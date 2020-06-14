import IDAO from './IDAO';
import ConnectionFactory from './ConnectionFactory';

import Result from '../../../utils/Result';

import Produto from '../../dominio/Produto';
import FichaTecnica from '../../dominio/FichaTecnica';
import FichaTecnicaDAO from './FichaTecnicaDAO';

export default class ProdutoDAO implements IDAO {
  con: any;
  constructor(){
    this.con = ConnectionFactory.criar()
  }
  async criar(prod: Produto): Promise<Result> {
    const daoFichaTenica = new FichaTecnicaDAO();
    const resultFichaTecnica = await daoFichaTenica.criar(prod.fichaTecnica);
    if(!resultFichaTecnica.erro){
      const fic_id = resultFichaTecnica.data[0].id;
      prod.fichaTecnica.id = fic_id;
      const [pro_id] = await this.con('produto')
        .insert(this.converToDb(prod, fic_id))
      
      prod.id = pro_id
    }

    return new Result(
      prod.id ? 'sucesso' : 'falha',
      prod.id ? 0 : 1,
      [prod]
    );
  }

  async alterar(prod: Produto): Promise<Result> {
    let flag = false;
    if(!prod.id){
      throw 'operation update without where condition in table produto deny';
    }
    const daoFichaTenica = new FichaTecnicaDAO();
    await daoFichaTenica.alterar(prod.fichaTecnica)
      .then( result => {
        const pro_id = prod.id;
        if(!result.erro){
          return this.con('produto')
            .where({pro_id})
            .update(this.converToDb(prod, pro_id))
            .then( resp => flag = resp);
        }
      });

    return new Result(
      flag ? 'sucesso' : 'falha',
      flag ? 0 : 1,
      [prod]
    );
  }

  async consultar(prod: Produto): Promise<Result> {
    debugger;
    let objAtributeFilter = {};
    const arrTemp = []
    if(!prod){
      arrTemp.push(
        ...await this.con('produto')
          .select('*')
      )
  
    } else if(prod.id) {
      arrTemp.push(
        ...await this.con('produto')
          .select('*')
          .where({ pro_id: prod.id })
      );
    } else {
      arrTemp.push(
        ...await Object.entries(this.converToDb(prod, 0))
          .filter( e => !!e[1])
          .reduce(
            (acc, entrie, index) => {
              let condition = 'orWhere';
              if(!index){
                condition = 'where';
              }
              return acc[condition](entrie[0], 'like', `%${entrie[1]}%`);
            },
            this.con('produto').select('*')
          )
      );
    }

    const pProdutosWithFicha = arrTemp.map((prodLikeDb) => {
      const produto = this.converToDominio(prodLikeDb);
      return (new FichaTecnicaDAO()).consultar({id: prodLikeDb.fic_id} as FichaTecnica)
        .then(({data:[fichaTecnica]}) => {
          produto.fichaTecnica = fichaTecnica as FichaTecnica
          return produto
        });
    })

    return new Result(
      'sucesso',
      0,
      await Promise.all(pProdutosWithFicha)
    )
  }

  converToDb(p: Produto, fic_id: number){
    const objDb = {};
    p.nome && (objDb['pro_nome'] = p.nome);
    p.valor && (objDb['pro_valor'] = p.valor);
    p.dataEntrada && (objDb['pro_data_entrada'] = p.dataEntrada);
    p.quantidade && (objDb['pro_quantidade'] = p.quantidade);
    p.funcionario && (objDb['pro_funcionario'] = p.funcionario);
    fic_id && (objDb['fic_id'] = fic_id);
    return objDb
  }
  converToDominio({
    pro_id: id,
    pro_nome: nome,
    pro_valor: valor,
    pro_data_entrada: dataEntrada,
    pro_quantidade: quantidade,
    pro_funcionario: funcionario,
  }){
    const p = new Produto(
      nome,
      valor,
      dataEntrada,
      quantidade,
      funcionario,
      undefined
    );
    p.id = id;
    return p;
  }
}
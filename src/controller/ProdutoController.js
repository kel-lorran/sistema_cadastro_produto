import {Router} from 'express';
import ProdutoFacade from '../facade/ProdutoFacade.ts';

import Acessorio from '../model/dominio/Acessorio'
import FichaTecnica from '../model/dominio/FichaTecnica';
import Produto from '../model/dominio/Produto';

export default class ProdutoController extends Router{
  constructor(){
    super();
    this.post('/', ProdutoController.doPost);
    this.get('/', ProdutoController.doGet);
    this.put('/', ProdutoController.doPut);
    this.delete('/:id', ProdutoController.doDelet);
  }
  static async doGet(req, res){
    const query = req.query;
    const objParcialProduto = {};
    query.id && (objParcialProduto['id'] = query.id);
    query.nome && (objParcialProduto['nome'] = query.nome);
    query.valor && (objParcialProduto['valor'] = query.valor);
    query.dataEntrada && (objParcialProduto['dataEntrada'] = query.dataEntrada);
    query.quantidade && (objParcialProduto['quantidade'] = query.quantidade);
    query.comprador && (objParcialProduto['comprador'] = query.comprador);

    const facade = new ProdutoFacade();
    const result = await facade.consultar(objParcialProduto);
    if(result.erro) res.status(400);
    res.json(result);
  }

  static async doPost(req, res){
    //criar objetos do dominio
    //criar acessorios
    const body = req.body;
    const acessorioList = body.data[0].acessorioList.map(raw => new Acessorio(
      raw.nome,
      raw.descricao,
      raw.quantidade
    ));

    const {
      categoria,
      subCategoria,
      nome,
      descricao,
      componenteBasico,
      componentePrimario,
      componenteSecundario,
      observacoes,
    } = body.data[0].fichaTecnica;

    const fichaTecnica = new FichaTecnica(
      categoria,
      subCategoria,
      nome,
      descricao,
      componenteBasico,
      componentePrimario,
      componenteSecundario,
      observacoes,
      acessorioList
    );

    const {
      status,
      nome: pro_nome,
      valor,
      dataEntrada,
      quantidade,
      comprador,
    } = body.data[0].produto;

    const produto = new Produto(
      status,
      pro_nome,
      valor,
      dataEntrada,
      quantidade,
      comprador,
      fichaTecnica
    );

    const facade = new ProdutoFacade();
    const result = await facade.criar(produto);
    if(result.erro) res.status(400);
    res.json(result);
  }

  static async doPut(req, res) {
    //criar objetos do dominio
    //criar acessorios
    const body = req.body;
    const acessorioList = body.data[0].acessorioList.map(raw => {
      const acessorio = new Acessorio(
        raw.nome,
        raw.descricao,
        raw.quantidade
      );
      acessorio.id = raw.id;
      return acessorio
    });

    const {
      id,
      categoria,
      subCategoria,
      nome,
      descricao,
      componenteBasico,
      componentePrimario,
      componenteSecundario,
      observacoes,
    } = body.data[0].fichaTecnica;

    const fichaTecnica = new FichaTecnica(
      categoria,
      subCategoria,
      nome,
      descricao,
      componenteBasico,
      componentePrimario,
      componenteSecundario,
      observacoes,
      acessorioList
    );
    fichaTecnica.id = id;

    const {
      id: pro_id,
      status,
      nome: pro_nome,
      valor,
      dataEntrada,
      quantidade,
      comprador,
    } = body.data[0].produto;

    const produto = new Produto(
      status,
      pro_nome,
      valor,
      dataEntrada,
      quantidade,
      comprador,
      fichaTecnica
    );
    produto.id = pro_id;

    const facade = new ProdutoFacade();
    const result = await facade.alterar(produto);
    if(result.erro) res.status(400);
    res.json(result);
  }

  static async doDelet(req, res) {
    const facade = new ProdutoFacade();
    const result = await facade.excluir(req.params.id);
    if(result.erro) res.status(400);
    res.json(result);
  }
}
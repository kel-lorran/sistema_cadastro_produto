import {Router} from 'express';
import ProdutoFacade from '../facade/ProdutoFacade.ts'

export default class ProdutoController extends Router{
  constructor(){
    super()
    this.get('/', ProdutoController.doGet)
  }
  static doGet(req, res){
    const pF =  new ProdutoFacade();
    res.json(pF.criar());
  }
}
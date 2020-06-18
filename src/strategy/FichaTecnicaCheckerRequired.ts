import CheckerRequiredAttributes from './CheckerRequiredAttributes';
import AcessorioCheckerRequired from './AcessorioCheckerRequired'

export default class FichaTecnicaCheckerRequired extends CheckerRequiredAttributes {
  constructor() {
    super(['_id', 'observacoes'], [{attribute: '_acessorioList', checker: new AcessorioCheckerRequired()}]);
  }
}
import CheckerRequiredAttributes from './CheckerRequiredAttributes';
import FichaTecnicaCheckerRequired from './FichaTecnicaCheckerRequired';

export default class ProdutoCheckerRequired extends CheckerRequiredAttributes {
  constructor() {
    super(['_id'], [{attribute: '_fichaTecnica', checker: new FichaTecnicaCheckerRequired()}]);
  }
}
import CheckerRequiredAttributes from './CheckerRequiredAttributes';

export default class AcessorioCheckerRequired extends CheckerRequiredAttributes {
  constructor() {
    super(['_id']);
  }
}
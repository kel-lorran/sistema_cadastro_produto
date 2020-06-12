export default class EntidadeDominio {
  private _id: number;
  get id() {
    return this._id;
  }
  set id(newId: number) {
    this._id = newId;
  }
}
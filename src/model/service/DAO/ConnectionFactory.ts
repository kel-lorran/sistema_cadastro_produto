import knex from 'knex';
import configration from '../../../../knexfile';

export default class ConnectionFactory {
  static criar() {
    return knex(configration.development);
  }
}
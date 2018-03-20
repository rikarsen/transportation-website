export class PermanentClient {
  _id: string;
  client_name: string;
  last_date_driven: Date;

  constructor (permanentClient?) {
    permanentClient = permanentClient || {};

    this._id = permanentClient._id || null;
    this.client_name = permanentClient.client_name || '';
    this.last_date_driven = permanentClient.last_date_driven || new Date();
  }
}

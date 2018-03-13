export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
  token: string;

  constructor (user?) {
    user = user || {};

    this.id = user.number;
    this.username = user.string;
    this.password = user.string;
    this.name = user.string;
    this.role = user.string;
    this.token = user.string;
  }
}

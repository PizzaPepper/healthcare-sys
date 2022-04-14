import User from './User';

export default class Person extends User {
  constructor(
    _id: string,
    username: string,
    password: string,
    public name: string,
    public fsurname: string,
    public lsurname: string,
    public age: number,
    public role: string
  ) {
    super(_id, username, password);
  }
}

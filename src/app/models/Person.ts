import User from './User';

export default class Person {
  constructor(
    public _id: string,
    public name: string,
    public fsurname: string,
    public lsurname: string,
    public age: number,
    public role: string
  ) {
  }
}

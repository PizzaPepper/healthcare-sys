import Person from './Person';
import File from './File';
import Record from './Record';

export default class Expedient {
  constructor(
    public patient: Person,
    public records: Array<Record>,
    public files: Array<File>
  ) {}
}

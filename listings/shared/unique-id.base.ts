import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './id.base';

export class UniqueID extends Identifier<string> {
  constructor(id: string) {
    super(id);
  }

  static create(id?: string): UniqueID {
    if (id) return new UniqueID(id);
    return new UniqueID(uuidv4());
  }
}

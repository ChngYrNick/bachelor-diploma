import { UniqueID } from './unique-id.base';

export abstract class Entity {
  constructor(private readonly _id: UniqueID) {}

  get id(): UniqueID {
    return this._id;
  }

  public equals(object: Entity): boolean {
    return object.id === this.id;
  }
}

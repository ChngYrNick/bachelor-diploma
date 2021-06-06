import DomainError from '../../../shared/error.base';

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}

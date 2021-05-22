export interface Mapper<T, U> {
  toDomain(dto: T): U;
  toPersistence(domain: U): T;
}

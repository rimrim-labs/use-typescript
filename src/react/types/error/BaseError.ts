export class BaseError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

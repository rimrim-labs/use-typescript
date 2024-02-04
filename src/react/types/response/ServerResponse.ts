type ServerErrorCode = 'InvalidRequest' | 'IllegalState' | 'ServerError';

export interface ServeErrorResponse {
  code: ServerErrorCode;
  message: string;
}

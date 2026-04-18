export function getApiErrorStatus( error: unknown ) {
  if ( typeof error !== "object" || error === null ) return undefined;

  const maybeError = error as {
    response?: { status?: number; };
    status?: number;
  };

  return maybeError.response?.status ?? maybeError.status;
}

export function isApiNotFoundError( error: unknown ) {
  return getApiErrorStatus( error ) === 404;
}

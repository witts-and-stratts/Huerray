import type { AxiosError } from 'axios';
import type { ModelsStandardErrorResponse } from '../generated/models';

export type ApiError = AxiosError<ModelsStandardErrorResponse>;

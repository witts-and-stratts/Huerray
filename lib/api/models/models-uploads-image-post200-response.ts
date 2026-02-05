import type { ModelsStandardGenericResponse } from '@/lib/api/generated/models/models-standard-generic-response';

type ModelsUploadsImagePostResponse = {
    filename: string;
    size: number;
    type: string;
      url: string;
}

export type ModelsUploadsImagePost200Response = ModelsStandardGenericResponse & {
    data: ModelsStandardGenericResponse['data'] & {data: ModelsUploadsImagePostResponse[]};
}
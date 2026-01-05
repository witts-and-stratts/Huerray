import type { ModelsStandardResponse } from '@/lib/api/generated/models/models-standard-response';

type ModelsUploadsImagePostResponse = {
    filename: string;
    size: number;
    type: string;
      url: string;
}

export type ModelsUploadsImagePost200Response = ModelsStandardResponse & {
    data: ModelsStandardResponse['data'] & {data: ModelsUploadsImagePostResponse[]};
}
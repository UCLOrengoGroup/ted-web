/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ToolsService {

    /**
     * Create Consensus Domain Foldseek Search Url
     * Create a link to search consensus domain against FoldSeek.
     * @returns any URL for FoldSeek search of TED consensus domain
     * @throws ApiError
     */
    public static createConsensusDomainFoldseekSearchUrl({
        tedId,
        foldseekApiBase = 'https://search.foldseek.com/api',
    }: {
        tedId: string,
        foldseekApiBase?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/foldseek/{ted_id}',
            path: {
                'ted_id': tedId,
            },
            query: {
                'foldseek_api_base': foldseekApiBase,
            },
            errors: {
                404: `Failed to find TED domain`,
                422: `Validation Error`,
            },
        });
    }

}

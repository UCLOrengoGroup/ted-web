/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FilesService {

    /**
     * Read Consensus Domain Pdb
     * Retrieve PDB data for TED Domain.
     * @returns any PDB file for TED domain
     * @throws ApiError
     */
    public static readConsensusDomainPdb({
        tedId,
    }: {
        tedId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/files/{ted_id}.pdb',
            path: {
                'ted_id': tedId,
            },
            errors: {
                404: `Failed to find TED domain`,
                422: `Validation Error`,
            },
        });
    }

}

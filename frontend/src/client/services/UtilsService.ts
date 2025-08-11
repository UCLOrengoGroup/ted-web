/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UtilsService {

    /**
     * Health Check
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils/health-check/',
        });
    }

}

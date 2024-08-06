/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChainParseItemsPublic } from '../models/ChainParseItemsPublic';
import type { DomainSummaryItemsPublic } from '../models/DomainSummaryItemsPublic';
import type { UniprotSummary } from '../models/UniprotSummary';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UniprotService {

    /**
     * Read Uniprot Summary
     * Retrieve summary information for TED Domains.
     * @returns DomainSummaryItemsPublic Successful Response
     * @throws ApiError
     */
    public static readUniprotSummary({
        uniprotAcc,
        skip,
        limit = 100,
    }: {
        uniprotAcc: string,
        skip?: number,
        limit?: number,
    }): CancelablePromise<DomainSummaryItemsPublic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/uniprot/summary/{uniprot_acc}',
            path: {
                'uniprot_acc': uniprotAcc,
            },
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Uniprot Summary
     * Retrieve summary information for TED Domains (3D Beacons format).
     * @returns UniprotSummary Successful Response
     * @throws ApiError
     */
    public static readUniprotSummary1({
        uniprotAcc,
        skip,
        limit = 100,
    }: {
        uniprotAcc: string,
        skip?: number,
        limit?: number,
    }): CancelablePromise<UniprotSummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/uniprot/3dbeacons/summary/{uniprot_acc}',
            path: {
                'uniprot_acc': uniprotAcc,
            },
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Chainparse By Uniprot
     * Retrieve AFDB chain parses from individual methods.
     * @returns ChainParseItemsPublic Successful Response
     * @throws ApiError
     */
    public static readChainparseByUniprot({
        uniprotAcc,
        skip,
        limit = 100,
    }: {
        uniprotAcc: string,
        skip?: number,
        limit?: number,
    }): CancelablePromise<ChainParseItemsPublic> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/uniprot/chainparse/{uniprot_acc}',
            path: {
                'uniprot_acc': uniprotAcc,
            },
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}

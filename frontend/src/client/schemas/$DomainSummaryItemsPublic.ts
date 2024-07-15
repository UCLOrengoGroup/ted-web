/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DomainSummaryItemsPublic = {
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'DomainSummaryPublicWithInteractions',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;

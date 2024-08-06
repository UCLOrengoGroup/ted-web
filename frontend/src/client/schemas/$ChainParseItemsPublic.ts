/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChainParseItemsPublic = {
    properties: {
        data: {
            type: 'array',
            contains: {
                type: 'ChainParsePublic',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;

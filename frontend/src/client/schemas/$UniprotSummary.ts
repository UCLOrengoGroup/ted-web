/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UniprotSummary = {
    properties: {
        uniprot_entry: {
            type: 'any-of',
            contains: [{
                type: 'UniprotEntry',
            }, {
                type: 'null',
            }],
        },
        structures: {
            type: 'any-of',
            contains: [{
                type: 'array',
                contains: {
                    type: 'Overview',
                },
            }, {
                type: 'null',
            }],
        },
    },
} as const;

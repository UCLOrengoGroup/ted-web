/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InteractionSummary = {
    properties: {
        id: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        af_id: {
            type: 'string',
            isRequired: true,
        },
        ted_id1: {
            type: 'string',
            isRequired: true,
        },
        ted_id2: {
            type: 'string',
            isRequired: true,
        },
        pae_score: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;

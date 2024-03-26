/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Entity = {
    properties: {
        entity_type: {
            type: 'all-of',
            description: `The type of the molecular entity; similar to _entity.type in mmCIF`,
            contains: [{
                type: 'EntityType',
            }],
            isRequired: true,
        },
        entity_poly_type: {
            type: 'any-of',
            description: `The type of the molecular entity; similar to _entity_poly.type in mmCIF`,
            contains: [{
                type: 'EntityPolyType',
            }, {
                type: 'null',
            }],
        },
        identifier: {
            type: 'any-of',
            description: `Identifier of the molecule`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        identifier_category: {
            type: 'any-of',
            description: `Category of the identifier`,
            contains: [{
                type: 'IdentifierCategory',
            }, {
                type: 'null',
            }],
        },
        description: {
            type: 'string',
            description: `A textual label of the molecule`,
            isRequired: true,
        },
        chain_ids: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
} as const;

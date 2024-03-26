/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UniprotEntry = {
    properties: {
        ac: {
            type: 'string',
            description: `UniProt accession`,
            isRequired: true,
        },
        id: {
            type: 'any-of',
            description: `UniProt identifier`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        uniprot_checksum: {
            type: 'any-of',
            description: `CRC64 checksum of the UniProt sequence`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        sequence_length: {
            type: 'any-of',
            description: `Length of the UniProt sequence`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        segment_start: {
            type: 'any-of',
            description: `1-indexed first residue of the UniProt sequence segment`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        segment_end: {
            type: 'any-of',
            description: `1-indexed last residue of the UniProt sequence segment`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        description: {
            type: 'any-of',
            description: `Description of the UniProt entry`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
    },
} as const;

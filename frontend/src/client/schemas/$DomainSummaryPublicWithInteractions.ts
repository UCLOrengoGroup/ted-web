/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DomainSummaryPublicWithInteractions = {
    properties: {
        ted_id: {
            type: 'string',
            isRequired: true,
        },
        uniprot_acc: {
            type: 'string',
            isRequired: true,
        },
        md5_domain: {
            type: 'string',
            isRequired: true,
        },
        consensus_level: {
            type: 'string',
            isRequired: true,
        },
        chopping: {
            type: 'string',
            isRequired: true,
        },
        nres_domain: {
            type: 'number',
            isRequired: true,
        },
        num_segments: {
            type: 'number',
            isRequired: true,
        },
        plddt: {
            type: 'number',
            isRequired: true,
        },
        num_helix_strand_turn: {
            type: 'number',
            isRequired: true,
        },
        num_helix: {
            type: 'number',
            isRequired: true,
        },
        num_strand: {
            type: 'number',
            isRequired: true,
        },
        num_helix_strand: {
            type: 'number',
            isRequired: true,
        },
        num_turn: {
            type: 'number',
            isRequired: true,
        },
        proteome_id: {
            type: 'number',
            isRequired: true,
        },
        cath_label: {
            type: 'string',
            isRequired: true,
        },
        cath_assignment_level: {
            type: 'string',
            isRequired: true,
        },
        cath_assignment_method: {
            type: 'string',
            isRequired: true,
        },
        packing_density: {
            type: 'number',
            isRequired: true,
        },
        norm_rg: {
            type: 'number',
            isRequired: true,
        },
        tax_common_name: {
            type: 'string',
            isRequired: true,
        },
        tax_scientific_name: {
            type: 'string',
            isRequired: true,
        },
        tax_lineage: {
            type: 'string',
            isRequired: true,
        },
        interactions: {
            type: 'array',
            contains: {
                type: 'InteractionSummary',
            },
        },
    },
} as const;

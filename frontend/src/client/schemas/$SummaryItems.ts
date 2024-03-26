/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SummaryItems = {
    properties: {
        model_identifier: {
            type: 'string',
            description: `Identifier of the model, such as PDB id`,
            isRequired: true,
        },
        model_category: {
            type: 'all-of',
            description: `Category of the model`,
            contains: [{
                type: 'ModelCategory',
            }],
            isRequired: true,
        },
        model_url: {
            type: 'string',
            description: `URL of the model coordinates`,
            isRequired: true,
        },
        model_format: {
            type: 'all-of',
            description: `File format of the coordinates`,
            contains: [{
                type: 'ModelFormat',
            }],
            isRequired: true,
        },
        model_type: {
            type: 'any-of',
            description: `Defines if the coordinates are atomic-level or contains dummy atoms (e.g. SAXS models), or a mix of both (e.g. hybrid models)
            `,
            contains: [{
                type: 'ModelType',
            }, {
                type: 'null',
            }],
        },
        model_page_url: {
            type: 'any-of',
            description: `URL of a web page of the data provider that show the model`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        provider: {
            type: 'string',
            description: `Name of the model provider`,
            isRequired: true,
        },
        number_of_conformers: {
            type: 'any-of',
            description: `The number of conformers in a conformational ensemble`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        ensemble_sample_url: {
            type: 'any-of',
            description: `URL of a sample of conformations from a conformational ensemble`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        ensemble_sample_format: {
            type: 'any-of',
            description: `File format of the sample coordinates, e.g. PDB`,
            contains: [{
                type: 'EnsembleSampleFormat',
            }, {
                type: 'null',
            }],
        },
        created: {
            type: 'string',
            description: `Date of release of model generation in the format of YYYY-MM-DD`,
            isRequired: true,
        },
        sequence_identity: {
            type: 'number',
            description: `Sequence identity in the range of [0,1] of the model to the UniProt sequence
            `,
            isRequired: true,
        },
        uniprot_start: {
            type: 'number',
            description: `1-indexed first residue of the model according to UniProt sequence numbering
            `,
            isRequired: true,
        },
        uniprot_end: {
            type: 'number',
            description: `1-indexed last residue of the model according to UniProt sequence numbering
            `,
            isRequired: true,
        },
        coverage: {
            type: 'number',
            description: `Fraction in range of [0, 1] of the UniProt sequence covered by the model.  This is calculated as (uniprot_end - uniprot_start + 1) / uniprot_sequence_length
            `,
            isRequired: true,
        },
        experimental_method: {
            type: 'any-of',
            description: `Experimental method used to determine the structure, if applicable`,
            contains: [{
                type: 'ExperimentalMethod',
            }, {
                type: 'null',
            }],
        },
        resolution: {
            type: 'any-of',
            description: `The resolution of the model in Angstrom, if applicable`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        confidence_type: {
            type: 'any-of',
            description: `Type of the confidence measure. This is required for  theoretical models.
            `,
            contains: [{
                type: 'ConfidenceType',
            }, {
                type: 'null',
            }],
        },
        confidence_version: {
            type: 'any-of',
            description: `Version of confidence measure software used to calculate quality. This is required for theoretical models.
            `,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        confidence_avg_local_score: {
            type: 'any-of',
            description: `Average of the confidence measures in the range of [0,1] for QMEANDisCo  and [0,100] for pLDDT. Please contact 3D-Beacons developers if other  estimates are to be added. This is required for theoretical models.
            `,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        oligomeric_state: {
            type: 'any-of',
            description: `Oligomeric state of the model`,
            contains: [{
                type: 'OligomericState',
            }, {
                type: 'null',
            }],
        },
        oligomeric_state_confidence: {
            type: 'any-of',
            description: `Numerical value that describes the confidence in the oligomeric state of the predicted complex`,
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        preferred_assembly_id: {
            type: 'any-of',
            description: `Identifier of the preferred assembly in the model`,
            contains: [{
                type: 'string',
            }, {
                type: 'null',
            }],
        },
        entities: {
            type: 'array',
            contains: {
                type: 'Entity',
            },
            isRequired: true,
        },
    },
} as const;

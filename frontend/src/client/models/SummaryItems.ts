/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConfidenceType } from './ConfidenceType';
import type { EnsembleSampleFormat } from './EnsembleSampleFormat';
import type { Entity } from './Entity';
import type { ExperimentalMethod } from './ExperimentalMethod';
import type { ModelCategory } from './ModelCategory';
import type { ModelFormat } from './ModelFormat';
import type { ModelType } from './ModelType';
import type { OligomericState } from './OligomericState';

export type SummaryItems = {
    /**
     * Identifier of the model, such as PDB id
     */
    model_identifier: string;
    /**
     * Category of the model
     */
    model_category: ModelCategory;
    /**
     * URL of the model coordinates
     */
    model_url: string;
    /**
     * File format of the coordinates
     */
    model_format: ModelFormat;
    /**
     * Defines if the coordinates are atomic-level or contains dummy atoms (e.g. SAXS models), or a mix of both (e.g. hybrid models)
     *
     */
    model_type?: (ModelType | null);
    /**
     * URL of a web page of the data provider that show the model
     */
    model_page_url?: (string | null);
    /**
     * Name of the model provider
     */
    provider: string;
    /**
     * The number of conformers in a conformational ensemble
     */
    number_of_conformers?: (number | null);
    /**
     * URL of a sample of conformations from a conformational ensemble
     */
    ensemble_sample_url?: (string | null);
    /**
     * File format of the sample coordinates, e.g. PDB
     */
    ensemble_sample_format?: (EnsembleSampleFormat | null);
    /**
     * Date of release of model generation in the format of YYYY-MM-DD
     */
    created: string;
    /**
     * Sequence identity in the range of [0,1] of the model to the UniProt sequence
     *
     */
    sequence_identity: number;
    /**
     * 1-indexed first residue of the model according to UniProt sequence numbering
     *
     */
    uniprot_start: number;
    /**
     * 1-indexed last residue of the model according to UniProt sequence numbering
     *
     */
    uniprot_end: number;
    /**
     * Fraction in range of [0, 1] of the UniProt sequence covered by the model.  This is calculated as (uniprot_end - uniprot_start + 1) / uniprot_sequence_length
     *
     */
    coverage: number;
    /**
     * Experimental method used to determine the structure, if applicable
     */
    experimental_method?: (ExperimentalMethod | null);
    /**
     * The resolution of the model in Angstrom, if applicable
     */
    resolution?: (number | null);
    /**
     * Type of the confidence measure. This is required for  theoretical models.
     *
     */
    confidence_type?: (ConfidenceType | null);
    /**
     * Version of confidence measure software used to calculate quality. This is required for theoretical models.
     *
     */
    confidence_version?: (string | null);
    /**
     * Average of the confidence measures in the range of [0,1] for QMEANDisCo  and [0,100] for pLDDT. Please contact 3D-Beacons developers if other  estimates are to be added. This is required for theoretical models.
     *
     */
    confidence_avg_local_score?: (number | null);
    /**
     * Oligomeric state of the model
     */
    oligomeric_state?: (OligomericState | null);
    /**
     * Numerical value that describes the confidence in the oligomeric state of the predicted complex
     */
    oligomeric_state_confidence?: (number | null);
    /**
     * Identifier of the preferred assembly in the model
     */
    preferred_assembly_id?: (string | null);
    /**
     * A list of molecular entities in the model
     */
    entities: Array<Entity>;
};


/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InteractionSummary } from './InteractionSummary';

export type DomainSummaryPublicWithInteractions = {
    ted_id: string;
    uniprot_acc: string;
    md5_domain: string;
    consensus_level: string;
    chopping: string;
    nres_domain: number;
    num_segments: number;
    plddt: number;
    num_helix_strand_turn: number;
    num_helix: number;
    num_strand: number;
    num_helix_strand: number;
    num_turn: number;
    proteome_id: number;
    cath_label: string;
    cath_assignment_level: string;
    cath_assignment_method: string;
    packing_density: number;
    norm_rg: number;
    tax_common_name: string;
    tax_scientific_name: string;
    tax_lineage: string;
    interactions?: Array<InteractionSummary>;
};


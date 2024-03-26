/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UniprotEntry = {
    /**
     * UniProt accession
     */
    ac: string;
    /**
     * UniProt identifier
     */
    id?: (string | null);
    /**
     * CRC64 checksum of the UniProt sequence
     */
    uniprot_checksum?: (string | null);
    /**
     * Length of the UniProt sequence
     */
    sequence_length?: (number | null);
    /**
     * 1-indexed first residue of the UniProt sequence segment
     */
    segment_start?: (number | null);
    /**
     * 1-indexed last residue of the UniProt sequence segment
     */
    segment_end?: (number | null);
    /**
     * Description of the UniProt entry
     */
    description?: (string | null);
};


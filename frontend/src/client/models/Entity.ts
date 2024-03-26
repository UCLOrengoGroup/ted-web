/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityPolyType } from './EntityPolyType';
import type { EntityType } from './EntityType';
import type { IdentifierCategory } from './IdentifierCategory';

export type Entity = {
    /**
     * The type of the molecular entity; similar to _entity.type in mmCIF
     */
    entity_type: EntityType;
    /**
     * The type of the molecular entity; similar to _entity_poly.type in mmCIF
     */
    entity_poly_type?: (EntityPolyType | null);
    /**
     * Identifier of the molecule
     */
    identifier?: (string | null);
    /**
     * Category of the identifier
     */
    identifier_category?: (IdentifierCategory | null);
    /**
     * A textual label of the molecule
     */
    description: string;
    /**
     * A list of label_asym identifiers ( chain_id in the case of PDB format) of the molecule
     */
    chain_ids: Array<string>;
};


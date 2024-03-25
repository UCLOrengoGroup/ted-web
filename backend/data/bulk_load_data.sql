begin;

-- remove indexes
drop index if exists "ix_domainsummary_consensus_level";
drop index if exists "ix_domainsummary_md5_domain";
drop index if exists "ix_domainsummary_proteome_id";
drop index if exists "ix_domainsummary_tax_scientific_name";
drop index if exists "ix_domainsummary_uniprot_acc";

-- drop constraint on uniprot id
ALTER TABLE domainsummary
ALTER COLUMN uniprot_id DROP NOT NULL;

-- AF-A0A000-F1-model_v4_TED01	f8de3d42c18e0e27c4f3cf4ee5a22ab8	high	11-41_290-389	131	2	94.2662	21	4	7	11	10	proteome-tax_id-67581-0_v4.consensus_domains	3.90.1150.10	H	foldseek	11.397	0.294	-	Streptomyces_viridosporus	cellular_organisms,Bacteria,Terrabacteria_group,Actinomycetota,Actinomycetes,Kitasatosporales,Streptomycetaceae,Streptomyces
COPY domainsummary(
    ted_id,
    md5_domain,
    consensus_level,
    chopping,
    nres_domain,
    num_segments,
    plddt,
    num_helix_strand_turn,
    num_helix,
    num_strand,
    num_helix_strand,
    num_turn,
    proteome_id,
    cath_label,
    cath_assignment_level,
    cath_assignment_method,
    packing_density,
    norm_rg,
    tax_common_name,
    tax_scientific_name,
    tax_lineage
)
FROM 'test100.domain_summary.tsv' DELIMITER '\t' CSV HEADER;

UPDATE domainsummary
SET uniprot_id = split_part(ted_id, '-', 2);

ALTER TABLE domainsummary
ALTER COLUMN uniprot_id NULL;


-- rebuild indexes
create index "ix_domainsummary_consensus_level" on domainsummary using btree (consensus_level);
create index "ix_domainsummary_md5_domain" on domainsummary using btree (md5_domain);
create index "ix_domainsummary_proteome_id" on domainsummary using btree (proteome_id);
create index "ix_domainsummary_tax_scientific_name" on domainsummary using btree (tax_scientific_name);
create index "ix_domainsummary_uniprot_acc" on domainsummary using btree (uniprot_acc);
-- WARNING: this will remove all data from 'domainsummary' table
delete from domainsummary;

-- remove indexes
drop index if exists "ix_domainsummary_consensus_level";
drop index if exists "ix_domainsummary_md5_domain";
drop index if exists "ix_domainsummary_proteome_id";
drop index if exists "ix_domainsummary_tax_scientific_name";
drop index if exists "ix_domainsummary_uniprot_acc";

-- AF-A0A000-F1-model_v4_TED01  f8de3d42c18e0e27c4f3cf4ee5a22ab8    high    11-41_290-389   131 2   94.2662 21  4   7   11  10  proteome-tax_id-67581-0_v4.consensus_domains    3.90.1150.10    H   foldseek    11.397  0.294   -   Streptomyces_viridosporus   cellular_organisms,Bacteria,Terrabacteria_group,Actinomycetota,Actinomycetes,Kitasatosporales,Streptomycetaceae,Streptomyces
--COPY domainsummary( ted_id, md5_domain, uniprot_acc, consensus_level, chopping, nres_domain, num_segments, plddt, num_helix_strand_turn, num_helix, num_strand, num_helix_strand, num_turn, proteome_id, cath_label, cath_assignment_level, cath_assignment_method, packing_density, norm_rg, tax_common_name, tax_scientific_name, tax_lineage )
--FROM PROGRAM '/data/convert_domainsummary.pl /data/test100.domain_summary.tsv';
-- COPY domainsummary( ted_id, md5_domain, uniprot_acc, consensus_level, chopping, nres_domain, num_segments, plddt, num_helix_strand_turn, num_helix, num_strand, num_helix_strand, num_turn, proteome_id, cath_label, cath_assignment_level, cath_assignment_method, packing_density, norm_rg, tax_common_name, tax_scientific_name, tax_lineage )
-- FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.cath.globularity.taxid.tsv';
-- split --lines=30000000 --numeric-suffixes=1 ted_100_324m.domain_summary.cath.globularity.taxid.tsv ted_100_324m.domain_summary.part- --additional-suffix=.tsv
COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-01.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-02.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-03.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-04.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-05.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-05.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-06.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-07.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-08.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-09.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-10.tsv';

COPY domainsummary(
    ted_id,
    md5_domain,
    uniprot_acc,
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
FROM PROGRAM '/data/convert_domainsummary.pl /data/ted_100_324m.domain_summary.part-11.tsv';


-- rebuild indexes
create index "ix_domainsummary_consensus_level" on domainsummary using btree (consensus_level);
create index "ix_domainsummary_md5_domain" on domainsummary using btree (md5_domain);
create index "ix_domainsummary_proteome_id" on domainsummary using btree (proteome_id);
create index "ix_domainsummary_tax_scientific_name" on domainsummary using btree (tax_scientific_name);
create index "ix_domainsummary_uniprot_acc" on domainsummary using btree (uniprot_acc);

-- analyze
VACUUM (ANALYZE, VERBOSE, FULL) domainsummary;
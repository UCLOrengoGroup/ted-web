-- WARNING: this will remove all data from 'chainparse' table
delete from chainparse;

-- remove indexes
-- af_id: str = Field(nullable=False)
-- uniprot_acc: str = Field(nullable=False, index=True)
-- method: str = Field(nullable=False, index=True)
-- md5_chain: str = Field(nullable=False, index=True)
-- nres_chain: int = Field(nullable=False)
-- num_domains: int = Field(nullable=False)
-- chopping: str = Field(nullable=False)
-- score: float = Field(nullable=False)
drop index if exists "ix_chainparse_uniprot_acc";
drop index if exists "ix_chainparse_method";
drop index if exists "ix_chainparse_md5_chain";

-- AF-A0A000-F1-model_v4_TED01  f8de3d42c18e0e27c4f3cf4ee5a22ab8    high    11-41_290-389   131 2   94.2662 21  4   7   11  10  proteome-tax_id-67581-0_v4.consensus_domains    3.90.1150.10    H   foldseek    11.397  0.294   -   Streptomyces_viridosporus   cellular_organisms,Bacteria,Terrabacteria_group,Actinomycetota,Actinomycetes,Kitasatosporales,Streptomycetaceae,Streptomyces
COPY chainparse(
    af_id,
    uniprot_acc,
    method,
    md5_chain,
    nres_chain,
    num_domains,
    chopping,
    score
)
FROM PROGRAM '/data/convert_chainparse.pl --method chainsaw /data/ted_100_188m.chainsaw.filtered.10.tsv';

COPY chainparse(
    af_id,
    uniprot_acc,
    method,
    md5_chain,
    nres_chain,
    num_domains,
    chopping,
    score
)
FROM PROGRAM '/data/convert_chainparse.pl --method merizo /data/ted_100_188m.merizo.filtered.10.tsv';

COPY chainparse(
    af_id,
    uniprot_acc,
    method,
    md5_chain,
    nres_chain,
    num_domains,
    chopping,
    score
)
FROM PROGRAM '/data/convert_chainparse.pl --method unidoc-NDR /data/ted_100_188m.unidoc-NDR.filtered.10.tsv';

-- split --lines=30000000 --numeric-suffixes=1 ted_100_188m.chainsaw.filtered.tsv ted_100_188m.chainsaw.filtered.part- --additional-suffix=.tsv
-- rebuild indexes
create index "ix_chainparse_uniprot_acc" on chainparse using btree (uniprot_acc);
create index "ix_chainparse_method" on chainparse using btree (method);
create index "ix_chainparse_md5_chain" on chainparse using btree (md5_chain);

-- analyze
VACUUM (ANALYZE, VERBOSE, FULL) chainparse;
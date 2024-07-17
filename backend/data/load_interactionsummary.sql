-- WARNING: this will remove all data from 'interactionsummary' table
delete from interactionsummary;

-- remove indexes
drop index if exists "ix_interactionsummary_ted_id1";
drop index if exists "ix_interactionsummary_ted_id2";

-- AF-A0A000-F1-model_v4,3.40.640.10-3.90.1150.10,AF-A0A000-F1-model_v4_TED02:AF-A0A000-F1-model_v4_TED01,4.0
COPY interactionsummary(
    af_id,
    ted_id1,
    ted_id2,
    pae_score
)
FROM PROGRAM 'perl /data/convert_interactionsummary.pl /data/test100.isp_data_afdbonly_nopaefilter.csv';

-- rebuild indexes
create index "ix_interactionsummary_ted_id1" on interactionsummary using btree (ted_id1);
create index "ix_interactionsummary_ted_id2" on interactionsummary using btree (ted_id2);

-- analyze
VACUUM (ANALYZE, VERBOSE, FULL) interactionsummary;
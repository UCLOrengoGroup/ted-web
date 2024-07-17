#!/usr/bin/env perl

use strict;
use warnings;

# AF-A0A000-F1-model_v4,3.40.640.10-3.90.1150.10,AF-A0A000-F1-model_v4_TED02:AF-A0A000-F1-model_v4_TED01,4.0

while (<>) {
    chomp;
    my @cols = split(/,/, $_); 
    my $af_id = $cols[0]; 
    my ($cath_id1, $cath_id2) = split(/-/, $cols[1]);
    my ($ted_id1, $ted_id2) = split(/:/, $cols[2]);
    my $pae_score = $cols[3] + 0;
    print join("\t", $af_id, $ted_id1, $ted_id2, $pae_score), "\n";
}

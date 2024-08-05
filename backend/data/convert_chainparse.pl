#!/usr/bin/env perl

use strict;
use warnings;
use Getopt::Long;

# AF-A0A000-F1-model_v4	e8872c7a0261b9e88e6ff47eb34e4162	394	2	1-51_289-388,53-287	0.0149

# af_id: str = Field(nullable=False)
# uniprot_acc: str = Field(nullable=False, index=True)
# method: str = Field(nullable=False, index=True)
# md5_chain: str = Field(nullable=False, index=True)
# nres_chain: int = Field(nullable=False)
# num_domains: int = Field(nullable=False)
# chopping: str = Field(nullable=False)
# score: float = Field(nullable=False)

my @VALID_METHODS = ('chainsaw', 'unidoc-ndr', 'merizo');

my $METHOD;
GetOptions(
    'method=s' => sub { my ($opt_name, $opt_value) = @_; $METHOD = lc($opt_value) },
);

if (!defined $METHOD) {
    die sprintf "usage: $0 --method [%s] data.tsv\n", join("|", @VALID_METHODS);
}
if (!grep { $_ eq $METHOD } @VALID_METHODS) {
    die "Invalid method: $METHOD\n";
}

while (<>) {
    chomp;
    my @cols = split(/\t/, $_); 
    if (scalar(@cols) != 6) {
        die sprintf "Invalid number of columns (%s): $_\n", scalar(@cols);
    } 
    my $af_id = $cols[0];
    my $md5_chain = $cols[1];
    my $nres_chain = $cols[2];
    my $num_domains = $cols[3];
    my $chopping = $cols[4];
    my $score = $cols[5];

    my $upid = (split /-/, $af_id)[1];

    print join("\t", $af_id, $upid, $METHOD, $md5_chain, $nres_chain, $num_domains, $chopping, $score), "\n";
}

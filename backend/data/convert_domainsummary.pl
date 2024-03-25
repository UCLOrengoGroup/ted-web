#!/usr/bin/env perl

# AF-A0A000-F1-model_v4_TED01  f8de3d42c18e0e27c4f3cf4ee5a22ab8    high    11-41_290-389   131 2   94.2662 21  4   7   11  10  proteome-tax_id-67581-0_v4.consensus_domains    3.90.1150.10    H   foldseek    11.397  0.294   -   Streptomyces_viridosporus   cellular_organisms,Bacteria,Terrabacteria_group,Actinomycetota,Actinomycetes,Kitasatosporales,Streptomycetaceae,Streptomyces

while (<>) {
    chomp;
    my @cols = split(/\t/, $_); 
    my $upid = (split /-/, $cols[0])[1]; 
    my $prtid = (split /-/, $cols[12])[2]; 
    # add uniprot_acc after md5
    splice(@cols, 2, 0, $upid); 
    # parse proteome_id as int
    splice(@cols, 13, 1, $prtid); 
    print join("\t", @cols), "\n";
}

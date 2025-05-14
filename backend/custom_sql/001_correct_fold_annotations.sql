update domainsummary
set cath_label = subpath(cath_label::ltree, 0, 3)::text
where cath_assignment_level = 'T'
    and cath_assignment_method = 'foldclass';
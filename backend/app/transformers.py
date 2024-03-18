from typing import List

from .models.db import DomainSummary
from .models.chopping import ChoppingResLabel, ChoppingNumeric
from .models.beacons import (
    UniprotSummary, UniprotEntry, SummaryItems, 
    ModelCategory, ModelFormat, ModelType, 
    ConfidenceType, Overview,
    Entity, EntityType, EntityPolyType, IdentifierCategory
)


def convert_domain_summary_to_uniprot_structure_summary_items(
        domain_summary: DomainSummary, 
        host="https://www.ted.org") -> SummaryItems:
    
    provider = "AlphaFold DB"
    date_created = "2022-06-01" # AF v4

    chopping = ChoppingNumeric.from_chopping_str(
        domain_id=domain_summary.ted_id, 
        chopping_str=domain_summary.chopping)
    first_res = chopping.get_first_res()
    last_res = chopping.get_last_res()
    coverage = 0 # TODO: faction of UniProt sequence covered by the model
    description = "" # TODO: add UniProt description (from?)

    summary_item = SummaryItems(
        model_identifier=domain_summary.ted_id,
        model_category=ModelCategory.TEMPLATE_BASED,
        model_url=f"{host}/files/{domain_summary.ted_id}.pdb",
        model_format=ModelFormat.PDB,
        model_type=ModelType.ATOMIC,
        model_page_url=f"{host}/domain/{domain_summary.ted_id}",
        provider=provider,
        created=date_created,
        sequence_identity=1,
        uniprot_start=int(first_res),
        uniprot_end=int(last_res),
        coverage=coverage,
        confidence_type=ConfidenceType.pLDDT,
        confidence_avg_local_score=domain_summary.plddt,
        entities=[Entity(
            entity_type=EntityType.POLYMER,
            entity_poly_type=EntityPolyType.POLYPEPTIDE_L_,
            identifier=domain_summary.uniprot_acc,
            identifier_category=IdentifierCategory.UNIPROT,
            chain_ids=["A"],
            description=description,
        )]
    )

    return summary_item



def create_uniprot_summary(uniprot_acc: str, domain_summary_items: List[DomainSummary]) -> UniprotSummary:

    summary_items_entries = []
    for domain_summary in domain_summary_items:
        summary_items = convert_domain_summary_to_uniprot_structure_summary_items(domain_summary)
        summary_items_entries.append(summary_items)

    return UniprotSummary(
        uniprot_entry=UniprotEntry(
            ac=uniprot_acc
        ),
        structures=[
            Overview(summary=summary_items) for summary_items in summary_items_entries
        ],
    )
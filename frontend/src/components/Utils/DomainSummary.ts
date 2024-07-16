import { DomainSummaryPublicWithInteractions } from "../../client"
import { DomainAnnotation, SegmentAnnotation } from "../Common/models"

export const getQueryParamsFromChoppingString = (chopping: string) => {
  const segs = getSegmentsFromChoppingString(chopping)
  return segs.map((seg: SegmentAnnotation) => {
    return { 
      start: seg.start, 
      end: seg.end,
      start_residue_number: seg.start,
      end_residue_number: seg.end,
      start_uniprot_residue_number: seg.start,
      end_uniprot_residue_number: seg.end,
    }
  })
}

export const getSegmentsFromChoppingString = (chopping: string): SegmentAnnotation[] => {
  const segs_strs = chopping.split("_")
  return segs_strs.map((seg_str) => {
    const [start_str, end_str] = seg_str.split("-")
    const start = parseInt(start_str)
    const end = parseInt(end_str)
    return {
      start: start,
      end: end,
    }
  })
}

export const getDomainAnnotationFromDomainSummary = (domsum: DomainSummaryPublicWithInteractions): DomainAnnotation => {
  return {
    id: domsum.ted_id,
    annotation: domsum.cath_label,
    segments: getSegmentsFromChoppingString(domsum.chopping)
  }
}
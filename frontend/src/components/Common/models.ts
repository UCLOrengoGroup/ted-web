
export interface SegmentAnnotation {
  start: number
  end: number
}
  
export interface DomainAnnotation {
  id: string
  annotation: string
  segments: SegmentAnnotation[]
}

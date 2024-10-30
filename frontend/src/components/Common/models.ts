export interface SegmentAnnotation {
  start: number
  end: number
}

export interface DomainAnnotation {
  id: string
  annotation: string
  segments: SegmentAnnotation[]
}

export class AfChainId {
  id: string
  uniprot_acc: string
  version: number
  fragment: number

  constructor(id: string) {
    // AF-A0A000-F1-model_v4
    this.id = id
    const afid_regex = /^AF-(\w+)-F(\d+)-model_v(\d+)$/
    const matches = id.match(afid_regex)

    if (!matches) {
      throw new Error(`Invalid afid format '${id}'`) // Throw an error if the id format is invalid
    }

    const [, uniprot_acc, fragment, version] = matches // Destructure the matched groups
    this.uniprot_acc = uniprot_acc
    this.version = Number.parseInt(version)
    this.fragment = Number.parseInt(fragment)
  }
}

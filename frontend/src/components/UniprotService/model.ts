export type UniprotData = {
  accession: string
  id: string
  organism: {
    scientificName: string
    commonName: string
    taxonomy: number
    lineage: string[]
  }
  proteinDescription: {
    fullName: string
    shortName: string
  }
  sequence: {
    length: number
    sequence: string
    md5: string
  }
}

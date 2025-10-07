import axios from "axios"

import type { UniprotEntry } from "../../client/models/UniprotEntry"

const AFDB_API_BASE_URL = "https://alphafold.ebi.ac.uk/"
const AFDB_VERSION_LATEST = "6"


const http = axios.create({
  baseURL: `${AFDB_API_BASE_URL}/api/uniprot/summary/`,
  headers: {
    "Content-type": "application/json",
  },
})

export const convertWebToModel = (data: any): UniprotEntry => {
  return data.uniprot_entry
}

const get = (id: any): Promise<UniprotEntry> => {
  return http.get(`/${id}.json`).then((response) => {
    // console.log("AlphaFold.API.response.data: ", response.data)
    return convertWebToModel(response.data)
  })
}

const getCifUrl = (afdb_id: string) => {
  const afdb_id_with_latest_version = afdb_id.replace(/_v\d+/, `_v${AFDB_VERSION_LATEST}`)
  return `${AFDB_API_BASE_URL}/files/${afdb_id_with_latest_version}.cif`
}

const AlphaFoldUniprotEntryDataService = {
  get,
  getCifUrl,
  AFDB_API_BASE_URL,
  AFDB_VERSION_LATEST,
}

export default AlphaFoldUniprotEntryDataService

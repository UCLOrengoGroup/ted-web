import axios from "axios";

import { UniprotEntry } from "../../client/models/UniprotEntry"

const http = axios.create({
  baseURL: "https://alphafold.ebi.ac.uk/api/uniprot/summary/",
  headers: {
    "Content-type": "application/json"
  }
});

export const convertWebToModel = (data: any): UniprotEntry => {
  return data.uniprot_entry;
}

const get = (id: any): Promise<UniprotEntry> => {
  return http.get(`/${id}.json`)
    .then((response) => {
      // console.log("AlphaFold.API.response.data: ", response.data)
      return convertWebToModel(response.data);
    });
};

const AlphaFoldUniprotEntryDataService = {
  get,
};

export default AlphaFoldUniprotEntryDataService;

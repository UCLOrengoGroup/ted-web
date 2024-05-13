import axios from "axios";

import { UniprotData } from "./model"

const http = axios.create({
  baseURL: "https://www.ebi.ac.uk/proteins/api",
  headers: {
    "Content-type": "application/json"
  }
});

const convertUniprotWebToModel = (data: any): UniprotData => {
  const scientificName = data.organism.names.find((name: any) => name.type === "scientific");
  const commonName = data.organism.names.find((name: any) => name.type === "common");
  const fullName = data.protein.submittedName && data.protein.submittedName[0].fullName?.value;
  const shortName = data.protein.submittedName && data.protein.submittedName[0].shortName?.value;
  // console.log("UniProt.API.data: ", data)
  return {
    accession: data.accession,
    id: data.id,
    organism: {
      scientificName: scientificName ? scientificName.value : null,
      commonName: commonName ? commonName.value : null,
      taxonomy: data.organism.taxonomy,
      lineage: data.organism.lineage
    },
    proteinDescription: {
      fullName: fullName,
      shortName: shortName
    },
    sequence: {
      length: data.sequence.length,
      sequence: data.sequence.sequence,
      md5: data.sequence.md5,
    }
  };
}

const get = (id: any): Promise<UniprotData> => {
  return http.get(`/proteins/${id}`)
    .then((response) => {
      // console.log("UniProt.API.response.data: ", response.data)
      return convertUniprotWebToModel(response.data);
    });
};

const UniprotEntryDataService = {
  get,
};

export default UniprotEntryDataService;

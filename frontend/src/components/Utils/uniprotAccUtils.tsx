import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Link } from "@chakra-ui/react"
import { AfChainId } from "../Common/models"
import AlphaFoldService from "../AlphaFoldService/service"

const API_BASE_URL = import.meta.env.VITE_API_URL
const CATH_BASE_URL = "https://www.cathdb.info/"
const AFDB_BASE_URL = AlphaFoldService.AFDB_API_BASE_URL

export function ted_pdb_file_url(ted_id: string): string {
  return `${API_BASE_URL}/api/v1/files/${ted_id}.pdb`
}

export function af_pdb_file_url(af_id: string): string {
  return `${AFDB_BASE_URL}/files/${af_id}.pdb`
}

export function ted_domain_to_id(ted_domain: string): string {
  const id_parts = ted_domain.split("_")
  return id_parts[id_parts.length - 1]
}

export function ted_domain_to_afid(ted_id: string): AfChainId {
  const id_parts = ted_id.split("_").slice(0, -1)
  const af_id = id_parts?.join("_")
  return new AfChainId(af_id)
}

export function render_cath_label(cath_label: string): JSX.Element {
  // HACK: if the cath label has more than one cath id, we only show the first one
  const cath_ids = cath_label.split(",")
  const cath_id = cath_ids[0]
  if (!cath_id || cath_id === "-") {
    return <>-</>
  }
  return (
    <Link href={get_cath_cathnode_url(cath_id)} isExternal>
      {cath_id} <ExternalLinkIcon mx="2px" />
    </Link>
  )
}

export function get_cath_cathnode_url(cath_id: string): string {
  if (!cath_id || cath_id === "-") {
    throw Error("CATH ID is blank")
  }
  return `${CATH_BASE_URL}/version/latest/cathnode/${cath_id}`
}

export function get_pae_color_scheme(pae_score: number): string {
  if (pae_score < 2.5) {
    return "green"
  }
  if (pae_score < 4.0) {
    return "yellow"
  }
  return "red"
}

export function get_plddt_color_scheme(plddt: number) {
  if (plddt < 50) {
    return "plddtVeryLow"
  }
  if (plddt < 70) {
    return "plddtLow"
  }
  if (plddt < 90) {
    return "plddtHigh"
  }

  return "plddtVeryHigh"
}

export function get_chainparse_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/chainparse/${uniprot_acc}`
}

export function get_domainsummary_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/summary/${uniprot_acc}`
}

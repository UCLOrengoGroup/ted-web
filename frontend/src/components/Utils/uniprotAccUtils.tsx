import { Link } from "@chakra-ui/react"
import { AfChainId } from "../Common/models"
import { ExternalLinkIcon } from '@chakra-ui/icons'

const API_BASE_URL = import.meta.env.VITE_API_URL
const CATH_BASE_URL = 'https://www.cathdb.info/'

export function ted_pdb_file_url(ted_id: string): string {
  return `${API_BASE_URL}/api/v1/files/${ted_id}.pdb`
}

export function ted_domain_to_id(ted_domain: string): string {
  const id_parts = ted_domain.split('_')
  return id_parts[id_parts.length - 1]
}

export function ted_domain_to_afid(ted_id: string): AfChainId {
  const id_parts = ted_id.split('_').slice(0, -1)
  const af_id = id_parts?.join('_')
  return new AfChainId(af_id)
}

export function render_cath_label(cath_label: string): JSX.Element {
  const cath_ids = cath_label.split(",");
  const links = (<>
    { cath_ids.map((cath_id, idx) => {
        if (!cath_id || cath_id == "-") {
          return <>-</>;
        }
        return <Link key={idx} href={get_cath_sfam_url(cath_id)} isExternal>{cath_id} <ExternalLinkIcon mx="2px" /></Link>
    })}
    </>
  )
  return links
}

export function get_cath_sfam_url(cath_id: string): string {
  if (!cath_id || cath_id == "-") {
    throw Error("CATH ID is blank");
  }
  return `${CATH_BASE_URL}/version/latest/superfamily/${cath_id}`
}

export function get_pae_color_scheme(pae_score: number): string {
  if (pae_score < 2.5) {
    return "green"
  } else if (pae_score < 4.0) {
    return "yellow"
  } else {
    return "red"
  }
}

export function get_plddt_color_scheme(plddt: number) {
  if (plddt < 50) {
    return "plddtVeryLow"
  } else if (plddt < 70) {
    return "plddtLow"
  } else if (plddt < 90) {
    return "plddtHigh"
  }
  else {
    return "plddtVeryHigh"
  }
}

export function get_chainparse_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/chainparse/${uniprot_acc}`
}

export function get_domainsummary_data_link(uniprot_acc: string) {
  return `${API_BASE_URL}/api/v1/uniprot/summary/${uniprot_acc}`
}

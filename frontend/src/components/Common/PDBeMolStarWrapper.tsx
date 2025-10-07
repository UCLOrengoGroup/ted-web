import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

import type { ColorParams, InitParams } from "pdbe-molstar/lib/spec"
/*  Might require extra configuration,
see https://webpack.js.org/loaders/sass-loader/ for example.
create-react-app should support this natively. */
import { createRef, useEffect } from "react"
import { getColourByIndex, hexToRgb } from "./DomainColors"
import type { DomainAnnotation } from "./models"

import "molstar/lib/mol-plugin-ui/skin/light.scss"

const AFDB_VERSION_LATEST = "6"

interface PDBeMolStarWrapperProps {
  afdb: string
  onInit: (instance: PDBeMolstarPlugin) => void
  domainAnnotations?: DomainAnnotation[]
}

const PDBeMolStarWrapper: React.FC<PDBeMolStarWrapperProps> = ({
  afdb,
  onInit,
  domainAnnotations,
}) => {
  const parent = createRef<HTMLDivElement>()

  // In debug mode of react's strict mode, this code will
  // be called twice in a row, which might result in unexpected behavior.

  // biome-ignore lint/correctness/useExhaustiveDependencies(a): following biome advice breaks molstar
  useEffect(() => {
    function init() {

      // HACK: the TED database has annotations that refer to v4 of AFDB, however
      // AFDB no longer provide the v4 files. Until we replace the TED annotations,
      // we will just have to replace the version with the latest one. 
      const afdbWithLatestVersion = afdb.replace(/v\d+$/, `v${AFDB_VERSION_LATEST}`)

      if (afdb !== afdbWithLatestVersion) {
        console.warn(`AFDB version in TED id ${afdb} replaced with latest version ${afdbWithLatestVersion}`)
      }

      const url = `https://alphafold.ebi.ac.uk/files/${afdbWithLatestVersion}.cif`

      const pluginInstance = new PDBeMolstarPlugin()

      const nonSelectedColor: ColorParams = { r: 235, g: 235, b: 235 }
      const domainDataSelection = domainAnnotations?.flatMap(
        (dom, dom_index) => {
          const dom_col = getColourByIndex(dom_index)
          const dom_rgb = hexToRgb(dom_col)
          return dom.segments.map((seg) => {
            return {
              start: seg.start,
              start_residue_number: seg.start,
              start_uniprot_number: seg.start,
              end: seg.end,
              end_residue_number: seg.end,
              end_uniprot_number: seg.end,
              color: dom_rgb,
            }
          })
        },
      )
      const domainSelection = domainDataSelection && {
        data: domainDataSelection,
        nonSelectedColor: nonSelectedColor,
      }

      //Set options (Checkout available options list in the documentation)
      const options: Partial<InitParams> = {
        customData: {
          url: url,
          format: "cif",
          binary: false,
        },
        alphafoldView: true,
        highlightColor: { r: 0, g: 0, b: 0 },
        bgColor: { r: 235, g: 235, b: 235 },
        selectColor: { r: 0, g: 0, b: 0 },
        hideControls: true,
        sequencePanel: true,
      }
      if (domainSelection) {
        options.selection = domainSelection
      }

      if (parent.current === null) return

      //Call render method to display the 3D view
      pluginInstance.render(parent.current, options)

      // pluginInstance.visual.select({ data: { type: "all" }, nonSelectedColor: { r: 0, g: 0, b: 0 } })

      if (onInit) {
        onInit(pluginInstance)
      }
    }
    init()
  }, [])

  return <div ref={parent} style={{ width: 640, height: 480 }} />
}

export default PDBeMolStarWrapper

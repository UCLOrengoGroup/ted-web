import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

/*  Might require extra configuration,
see https://webpack.js.org/loaders/sass-loader/ for example.
create-react-app should support this natively. */
import { createRef, useEffect } from "react"
import "molstar/lib/mol-plugin-ui/skin/light.scss";

interface PDBeMolStarWrapperProps {
  afdb: string
  onInit: (instance: PDBeMolstarPlugin) => void
}

const PDBeMolStarWrapper: React.FC<PDBeMolStarWrapperProps> = ({ afdb, onInit }) => {
  const parent = createRef<HTMLDivElement>()

  // In debug mode of react's strict mode, this code will
  // be called twice in a row, which might result in unexpected behavior.
  useEffect(() => {
    function init() {
      const url = `https://alphafold.ebi.ac.uk/files/${afdb}.cif`

      const pluginInstance = new PDBeMolstarPlugin()

      //Set options (Checkout available options list in the documentation)
      const options = {
        customData: {
          url: url,
          format: "cif",
          binary: false,
        },
        alphafoldView: true,
        bgColor: { r: 255, g: 255, b: 255 },
        selectColor: { r: 0, g: 0, b: 0 },
        highlightColor: { r: 0, g: 0, b: 0 },
        hideControls: true,
        sequencePanel: true,
      }

      if (parent.current === null) return

      //Call render method to display the 3D view
      pluginInstance.render(parent.current, options)

      if (onInit) {
        onInit(pluginInstance)
      }
    }
    init()
  }, [])

  return <div ref={parent} style={{ width: 640, height: 480 }} />
}

export default PDBeMolStarWrapper

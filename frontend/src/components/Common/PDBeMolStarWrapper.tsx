import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

/*  Might require extra configuration,
see https://webpack.js.org/loaders/sass-loader/ for example.
create-react-app should support this natively. */
import { createRef, useEffect } from "react"

interface PDBeMolStarWrapperProps {
  afdb: string
}

const PDBeMolStarWrapper: React.FC<PDBeMolStarWrapperProps> = ({ afdb }) => {
  const parent = createRef<HTMLDivElement>()

  // In debug mode of react's strict mode, this code will
  // be called twice in a row, which might result in unexpected behavior.
  useEffect(() => {
    function init() {
      const url = `https://alphafold.ebi.ac.uk/files/${afdb}.pdb`

      const viewerInstance = new PDBeMolstarPlugin()

      //Set options (Checkout available options list in the documentation)
      const options = {
        customData: {
          url: url,
          format: "pdb",
          binary: false,
        },
        alphafoldView: true,
        bgColor: { r: 255, g: 255, b: 255 },
        // hideCanvasControls: ['selection', 'animation', 'controlToggle', 'controlInfo']
      }

      if (parent.current === null) return

      //Call render method to display the 3D view
      viewerInstance.render(parent.current, options)
    }
    init()
    // return () => {
    //   window.molstar?.dispose()
    //   window.molstar = undefined
    // }
  }, [])

  return <div ref={parent} style={{ width: 640, height: 480 }} />
}

export default PDBeMolStarWrapper

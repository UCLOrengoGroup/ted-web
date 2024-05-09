import PropTypes from "prop-types"

import { DomainColours } from "./DomainColors"

import { DomainAnnotation } from "./models"

export interface ProteinSummaryFigureProps {
  width: number
  height: number
  totalResidues: number
  domainAnnotations: DomainAnnotation[]
  highlightedDomainId?: string
}

function ProteinSummaryFigure(props: ProteinSummaryFigureProps) {
  const { width, height, totalResidues, domainAnnotations, highlightedDomainId } = props

  const margin = 8
  const strokeWidth = 2
  const stroke = "#000"
  const bgFill = "#eeeeee"

  return (
    <svg
      version="1.1"
      baseProfile="full"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width - margin} height={height - margin} x={margin/2} y={margin/2} fill={bgFill} />
      
      {domainAnnotations.map((dom, dom_index) => {
        const dom_col = DomainColours[dom_index % DomainColours.length]
        return dom.segments.map((seg, seg_index) => {

          const resw = (width - margin) / totalResidues
          const segres = seg.end - seg.start + 1
          const segw = resw * segres
          const x = resw * seg.start
          const highlighted = highlightedDomainId && highlightedDomainId == dom.id
          return (
            <rect
              key={`dom${dom_index}-seg${seg_index}`}
              width={segw}
              height={height - margin}
              x={margin/2 + x}
              y={margin/2}
              strokeWidth={strokeWidth}
              stroke={highlighted ? stroke : "none"}
              fillOpacity={highlighted ? 1.0 : 0.75}
              fill={dom_col}
            />
          )
        })
      })}
    </svg>
  )
}

ProteinSummaryFigure.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  totalResidues: PropTypes.number.isRequired,
  residueAnnotations: PropTypes.array,
}

ProteinSummaryFigure.defaultProps = {
  width: 150,
  height: 20,
}

export default ProteinSummaryFigure

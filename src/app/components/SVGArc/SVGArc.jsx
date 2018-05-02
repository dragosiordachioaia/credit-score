import React from 'react';
import { drawArc } from './SVGArcHelpers';

/**
  props:
    radius
    color
    angle
**/

const SVGArc = props => {
  const boxSize = props.radius * 2 + props.strokeWidth * 2;
  const viewBox = [0, 0, boxSize, boxSize].join(' ');

  const d = drawArc({
    x: props.strokeWidth,
    y: props.strokeWidth,
    radius: props.radius,
    startAngle: 0,
    endAngle: props.angle
  });

  const transform = `translate(${props.radius} ${props.radius})`;

  const style = {
    position: 'absolute',
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    top: `calc(50% - ${boxSize/2}px)`,
    left: `calc(50% - ${boxSize/2}px)`,
  }

  return (
    <svg
      style={style}
      viewBox={viewBox}>
        <g transform={transform}>
            <path
              d={d}
              stroke={`${props.color}`}
              strokeWidth="3"
              fill="none"
            />
        </g>
    </svg>
  )
};

export default SVGArc;

import React from 'react';
import { drawArc } from './SVGArcHelpers';

/**
  props:
    radius
    color
    angle
**/

const SVGArc = props => {
  const strokeWidth = props.strokeWidth || 3;
  const viewBox = [
    0,
    0,
    (parseFloat(props.radius * 2) + parseFloat(strokeWidth * 2)),
    (parseFloat(props.radius * 2) + parseFloat(strokeWidth * 2)),
  ].join(' ');

  const d = drawArc({
    x: strokeWidth,
    y: strokeWidth,
    radius: props.radius,
    startAngle: 0,
    endAngle: props.angle
  });

  const transform = `translate(${props.radius} ${props.radius})`;

  return (
    <svg
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

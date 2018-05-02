import React, { Component } from 'react';

import bemHelper from '../../utils/bem';

import './slide.scss';

const cn = bemHelper({ block: 'slide' });

export default class Slide extends Component {
  constructor(props) {
    super(props);
    // this.fetchScoreData = this.fetchScoreData.bind(this);
  }

  componentDidMount() {

  }

  displayCircleSVG() {
    const secondsTotal = 700;
    let secondsLeft = 600;

    const radius = 150;
    const center = radius;
    const multiplier = secondsTotal / 360;
    const degrees = (secondsTotal - secondsLeft) / multiplier;

    const degreesArc1 = Math.min(degrees, 180);
    const radiansArc1 = degreesArc1 * Math.PI / 180;
    const arcX1 = center + radius * Math.sin(radiansArc1);
    const arcY1 = center - radius * Math.cos(radiansArc1);

    const degreesArc2 = Math.max(0, degrees - 180);
    const radiansArc2 = degrees * Math.PI / 180;
    const arcX2 = center + radius * Math.sin(radiansArc2);
    const arcY2 = center - radius * Math.cos(radiansArc2);

    let arcFillColor = "#444";
    if (degrees > 180) {
      arcFillColor = "red";
    }
    const circleFillColor = "none";

    let secondElement;
    if (degreesArc2 > 0) {
      secondElement = (
        <path
          d={`M${center},${center} L${center},${center +
            radius} A${radius},${radius} 1 0,1 ${arcX2},${arcY2} z`}
          fill={arcFillColor}
        />
      );
    }
    const svgStyle = {
      width: `${radius * 2}px`,
      height: `${radius * 2}px`
    };

    return (
      <svg style={svgStyle} className="clock-icon">
        <circle cx={center} cy={center} r={radius} fill={circleFillColor} />
        <path
          fill={arcFillColor}
          d={`M${center},${center} L${center},0 A${radius},${radius} 1 0,1 ${arcX1},${arcY1} z`}
        />
        {secondElement}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={circleFillColor}
          strokeWidth="4"
          fill="none"
        />
      </svg>
    );

  }

  render() {
    return (
      <div className={cn(null, 'main')}>
        <div className={cn('bg')}></div>
        <div className={cn('border')}></div>
        <div className={cn('path-wrapper')}>
          {this.displayCircleSVG()}
        </div>
      </div>
    )
  }
}

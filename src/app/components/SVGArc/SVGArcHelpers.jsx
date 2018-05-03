export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

export const drawArc = ({x, y, radius, startAngle, endAngle}) => {
  let isCompleteCircle = Math.abs(startAngle - endAngle) % 360 == 0;
  const startPoint = polarToCartesian(x, y, radius, endAngle);
  const endPoint = polarToCartesian(x, y, radius, startAngle);
  let largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `
      M ${startPoint.x} ${startPoint.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endPoint.x} ${endPoint.y}
      ${isCompleteCircle ? 'Z' : ''}
  `;
}

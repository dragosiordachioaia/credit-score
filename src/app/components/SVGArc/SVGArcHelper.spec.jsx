import React from 'react';
import renderer from 'react-test-renderer';

import * as helperMethods from './SVGArcHelpers';

let baseParams = {
  x: 0,
  y: 0,
  radius: 100,
  startAngle: 0,
  endAngle: 0,
}

describe('SVGArc helpers', () => {
  it('drawArc works correctly for 0 degree angle', () => {
    let params = Object.assign({}, baseParams, {endAngle: 0});
    const result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 90 degree angle', () => {
    let params = Object.assign({}, baseParams, {endAngle: 90});
    const result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 180 degree angle', () => {
    let params = Object.assign({}, baseParams, {endAngle: 180});
    const result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 270 degree angle', () => {
    let params = Object.assign({}, baseParams, {endAngle: 270});
    const result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 360 degree angle', () => {
    let params = Object.assign({}, baseParams, {endAngle: 360});
    const result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
});

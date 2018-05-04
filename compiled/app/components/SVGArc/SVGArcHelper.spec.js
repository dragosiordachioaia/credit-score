"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var helperMethods = _interopRequireWildcard(require("./SVGArcHelpers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseParams = {
  x: 0,
  y: 0,
  radius: 100,
  startAngle: 0,
  endAngle: 0
};
describe('SVGArc helpers', function () {
  it('drawArc works correctly for 0 degree angle', function () {
    var params = Object.assign({}, baseParams, {
      endAngle: 0
    });
    var result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 90 degree angle', function () {
    var params = Object.assign({}, baseParams, {
      endAngle: 90
    });
    var result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 180 degree angle', function () {
    var params = Object.assign({}, baseParams, {
      endAngle: 180
    });
    var result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 270 degree angle', function () {
    var params = Object.assign({}, baseParams, {
      endAngle: 270
    });
    var result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
  it('drawArc works correctly for 360 degree angle', function () {
    var params = Object.assign({}, baseParams, {
      endAngle: 360
    });
    var result = helperMethods.drawArc(params);
    expect(result).toMatchSnapshot();
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SVGArcHelpers = require("./SVGArcHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  props:
    radius
    color
    angle
**/
var SVGArc = function SVGArc(props) {
  var boxSize = props.radius * 2 + props.strokeWidth * 2;
  var viewBox = [0, 0, boxSize, boxSize].join(' ');
  var angle = props.angle % 360;
  var d = (0, _SVGArcHelpers.drawArc)({
    x: props.strokeWidth,
    y: props.strokeWidth,
    radius: props.radius,
    startAngle: 0,
    endAngle: angle
  });
  var transform = "translate(".concat(props.radius, " ").concat(props.radius, ")");
  var style = {
    position: 'absolute',
    width: "".concat(boxSize, "px"),
    height: "".concat(boxSize, "px"),
    top: "calc(50% - ".concat(boxSize / 2, "px)"),
    left: "calc(50% - ".concat(boxSize / 2, "px)")
  };
  return _react.default.createElement("svg", {
    style: style,
    viewBox: viewBox
  }, _react.default.createElement("g", {
    transform: transform
  }, _react.default.createElement("path", {
    d: d,
    stroke: "".concat(props.color),
    strokeWidth: "3",
    fill: "none"
  })));
};

var _default = SVGArc;
exports.default = _default;
module.exports = exports["default"];
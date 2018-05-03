"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawArc = exports.polarToCartesian = void 0;

var polarToCartesian = function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

exports.polarToCartesian = polarToCartesian;

var drawArc = function drawArc(_ref) {
  var x = _ref.x,
      y = _ref.y,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle;
  var isCompleteCircle = Math.abs(startAngle - endAngle) % 360 == 0;
  var startPoint = polarToCartesian(x, y, radius, endAngle);
  var endPoint = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return "\n      M ".concat(startPoint.x, " ").concat(startPoint.y, "\n      A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArcFlag, " 0 ").concat(endPoint.x, " ").concat(endPoint.y, "\n      ").concat(isCompleteCircle ? 'Z' : '', "\n  ");
};

exports.drawArc = drawArc;
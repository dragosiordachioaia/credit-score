"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideSizes = exports.breakpoints = exports.SCORE_DATA_URL = void 0;
var SCORE_DATA_URL = "https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json";
exports.SCORE_DATA_URL = SCORE_DATA_URL;
var breakpoints = {
  DESKTOP: 1040,
  TABLET: 700,
  MOBILE: 540
};
exports.breakpoints = breakpoints;
var slideSizes = {
  small: 85,
  medium: 120,
  big: 150
};
exports.slideSizes = slideSizes;
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _TweenMax = _interopRequireDefault(require("gsap/TweenMax"));

var helperMethods = _interopRequireWildcard(require("./SlideHelper"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  currentCoefficientNumber: 0.7342857142857143,
  currentCoefficientStroke: 0.7325868639732143,
  currentSlideIndex: 0,
  maxScore: 700,
  targetScore: 514
};
var props = {
  "animate": true,
  "size": "big",
  "radius": 150,
  "slides": [{
    "type": "score",
    "score": 514,
    "maxScore": 700,
    "color": "#a7ced1"
  }, {
    "type": "debt",
    "score": 24682,
    "maxScore": 49364,
    "color": "#FCD29F",
    "change": -327
  }, {
    "type": "balance",
    "score": 24682,
    "maxScore": 49364,
    "color": "#FCD29F"
  }, {
    "type": "offers",
    "score": 24682,
    "maxScore": 49364,
    "color": "#FCD29F"
  }, {
    "type": "debt",
    "score": 24682,
    "maxScore": 49364,
    "color": "#FCD29F",
    "change": 327
  }]
};
describe('Slide helpers', function () {
  it('getScoreSlide renders correctly', function () {
    var currentState = Object.assign({}, state);
    var result = helperMethods.getScoreSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getOffersSlide renders correctly', function () {
    var currentState = Object.assign({}, state, {
      currentSlideIndex: 3
    });
    var result = helperMethods.getOffersSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getBalanceSlide renders correctly', function () {
    var currentState = Object.assign({}, state, {
      currentSlideIndex: 2
    });
    var result = helperMethods.getBalanceSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getDebtSlide renders correctly when change is negative', function () {
    var currentState = Object.assign({}, state, {
      currentSlideIndex: 1
    });
    var result = helperMethods.getDebtSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getDebtSlide renders correctly when change is positive', function () {
    var currentState = Object.assign({}, state, {
      currentSlideIndex: 4
    });
    var result = helperMethods.getDebtSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
});
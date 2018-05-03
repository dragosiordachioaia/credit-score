"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDebtSlide = exports.getBalanceSlide = exports.getOffersSlide = exports.getScoreSlide = void 0;

var _react = _interopRequireDefault(require("react"));

var _bem = _interopRequireDefault(require("../../utils/bem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cn = (0, _bem.default)({
  block: 'slide'
});

var getScoreSlide = function getScoreSlide(props, state) {
  var currentSlideData = props.slides[state.currentSlideIndex];
  var crtScoreToDisplay = state.currentCoefficientNumber * currentSlideData.maxScore;
  return _react.default.createElement("div", {
    key: "slide-score",
    className: cn('individual-slide'),
    style: {
      width: "".concat(props.radius * 2, "px")
    }
  }, _react.default.createElement("p", {
    className: cn('small-text')
  }, "Your credit score is"), _react.default.createElement("h2", {
    className: cn('score-text'),
    style: {
      color: props.slides[state.currentSlideIndex].color
    }
  }, Math.round(crtScoreToDisplay)), _react.default.createElement("p", {
    className: cn('small-text')
  }, "out of", _react.default.createElement("b", {
    className: cn('max-score')
  }, state.maxScore)), _react.default.createElement("p", {
    className: cn('description-text'),
    style: {
      color: props.slides[state.currentSlideIndex].color
    }
  }, "Soaring high"));
};

exports.getScoreSlide = getScoreSlide;

var getOffersSlide = function getOffersSlide(props, state) {
  var currentSlideData = props.slides[state.currentSlideIndex];
  var crtScoreToDisplay = state.currentCoefficientNumber * currentSlideData.maxScore;
  return _react.default.createElement("div", {
    key: "slide-offers",
    className: cn('individual-slide'),
    style: {
      width: "".concat(props.radius * 2, "px")
    }
  }, _react.default.createElement("h2", {
    className: cn('score-text'),
    style: {
      color: props.slides[state.currentSlideIndex].color
    }
  }, Math.round(crtScoreToDisplay)), _react.default.createElement("p", {
    className: cn('small-text')
  }, "New offers"));
};

exports.getOffersSlide = getOffersSlide;

var getBalanceSlide = function getBalanceSlide(props, state) {
  return _react.default.createElement("div", {
    key: "slide-offers",
    className: cn('individual-slide'),
    style: {
      width: "".concat(props.radius * 2, "px")
    }
  }, _react.default.createElement("img", {
    src: "/cards.png",
    className: cn('cards')
  }), _react.default.createElement("p", {
    className: cn('small-text')
  }, "Transfer your ", _react.default.createElement("br", null), " balance!"));
};

exports.getBalanceSlide = getBalanceSlide;

var getDebtSlide = function getDebtSlide(props, state) {
  var currentSlideData = props.slides[state.currentSlideIndex];
  var crtScoreToDisplay = state.currentCoefficientNumber * currentSlideData.maxScore;
  var changeText = "\xA3".concat(Math.abs(currentSlideData.change));

  if (currentSlideData.change < 0) {
    changeText = "-".concat(changeText);
  }

  return _react.default.createElement("div", {
    key: "slide-debt",
    className: cn('individual-slide'),
    style: {
      width: "".concat(props.radius * 2, "px")
    }
  }, _react.default.createElement("p", {
    className: cn('small-text')
  }, "Your long term debt is"), _react.default.createElement("h2", {
    className: cn('score-text'),
    style: {
      color: props.slides[state.currentSlideIndex].color
    }
  }, "\xA3", Math.round(crtScoreToDisplay)), _react.default.createElement("p", {
    className: cn('small-text')
  }, "Change since last check: ", _react.default.createElement("b", null, changeText)), _react.default.createElement("p", {
    className: cn('description-text'),
    style: {
      color: props.slides[state.currentSlideIndex].color
    }
  }, "You're doing great!"));
};

exports.getDebtSlide = getDebtSlide;
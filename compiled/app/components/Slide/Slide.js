"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _bem = _interopRequireDefault(require("../../utils/bem"));

var _TweenMax = _interopRequireDefault(require("gsap/TweenMax"));

var _EasePack = _interopRequireDefault(require("gsap/EasePack"));

var _Constants = require("../../constants/Constants");

var _SlideHelper = require("./SlideHelper");

var _underscore = _interopRequireDefault(require("underscore"));

require("./slide.scss");

var _SVGArc = _interopRequireDefault(require("../SVGArc/SVGArc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var cn = (0, _bem.default)({
  block: 'slide'
});

var Slide =
/*#__PURE__*/
function (_Component) {
  function Slide(props) {
    var _this;

    _classCallCheck(this, Slide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slide).call(this, props));
    _this.state = {
      // the value that we want to display in the end, after the animation has ended
      targetScore: 0,
      // the maximum value that is possible to display, used to compute the coefficients
      maxScore: 0,
      // float between 0 and 1, to be used for showing the animated circular path
      currentCoefficientStroke: 0,
      // float between 0 and 1, to be used for displaying the big score text
      currentCoefficientNumber: 0,
      // the index of the current slide
      currentSlideIndex: 0
    };
    _this.animationDuration = 2; // these are the intermediate values for the tweens; we declare them here
    // just to know about them

    _this.valueTweenScore = 0;
    _this.valueTweenStroke = 0; // we need to keep a reference to the tween objects so we can kill them when unmounting

    _this.tweenStroke = null;
    _this.tweenScore = null;
    _this.startAnimation = _this.startAnimation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayContentReel = _this.displayContentReel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayMarkers = _this.displayMarkers.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.killTweens = _this.killTweens.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSlideClick = _this.onSlideClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNewProps = _this.onNewProps.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Slide, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onNewProps();
    }
  }, {
    key: "onNewProps",
    value: function onNewProps() {
      var newState = {
        targetScore: this.props.slides[0].score,
        maxScore: this.props.slides[0].maxScore,
        currentSlideIndex: 0
      };
      var stateChangeCallback = this.startAnimation;
      this.killTweens();

      if (!this.props.animate) {
        newState.currentCoefficientStroke = this.props.slides[0].score / this.props.slides[0].maxScore;
        newState.currentCoefficientNumber = newState.currentCoefficientStroke;
        stateChangeCallback = undefined;
      }

      this.setState(newState, stateChangeCallback);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.killTweens();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // this should probable be done in a smarter way
      if (JSON.stringify(this.props.slides) !== JSON.stringify(prevProps.slides)) {
        this.onNewProps();
      }
    }
  }, {
    key: "startAnimation",
    value: function startAnimation() {
      var _this2 = this;

      this.killTweens(); // we reset this so it always grows from 0 to our value for the desired effect
      // we do not neet to reset the 'stroke' one, because we want that one to
      // animate from the current position to the next

      this.valueTweenScore = 0;
      this.tweenScore = _TweenMax.default.to(this, this.animationDuration, {
        valueTweenScore: this.state.targetScore / this.state.maxScore,
        ease: _EasePack.default.Strong.easeOut,
        // we use the update handle from this tween to update both values instead
        // of doing it for both tweens in order to avoid re-rendering twice per animation cycle
        onUpdate: function onUpdate() {
          _this2.setState({
            currentCoefficientNumber: _this2.valueTweenScore,
            currentCoefficientStroke: _this2.valueTweenStroke
          });
        }
      });
      this.tweenStroke = _TweenMax.default.to(this, this.animationDuration, {
        valueTweenStroke: this.state.targetScore / this.state.maxScore,
        ease: _EasePack.default.Bounce.easeOut
      });
    }
  }, {
    key: "killTweens",
    value: function killTweens() {
      if (this.tweenStroke) {
        this.tweenStroke.kill();
      }

      if (this.tweenScore) {
        this.tweenScore.kill();
      }
    }
  }, {
    key: "displayContentReel",
    value: function displayContentReel() {
      var _this3 = this;

      return this.props.slides.map(function (slideData) {
        switch (slideData.type) {
          case 'score':
            return (0, _SlideHelper.getScoreSlide)(_this3.props, _this3.state);

          case 'offers':
            return (0, _SlideHelper.getOffersSlide)(_this3.props, _this3.state);

          case 'debt':
            return (0, _SlideHelper.getDebtSlide)(_this3.props, _this3.state);

          case 'balance':
            return (0, _SlideHelper.getBalanceSlide)(_this3.props, _this3.state);

          default:
            return null;
        }
      });
    }
  }, {
    key: "getRadius",
    value: function getRadius(size) {
      var radius = _Constants.slideSizes.big;

      if (_Constants.slideSizes.hasOwnProperty(size)) {
        radius = _Constants.slideSizes[size];
      }

      return radius;
    }
  }, {
    key: "onSlideClick",
    value: function onSlideClick() {
      var nextSlide = this.state.currentSlideIndex + 1;

      if (this.state.currentSlideIndex >= this.props.slides.length - 1) {
        nextSlide = 0;
      }

      var stateChangeCallback;

      if (this.props.animate) {
        stateChangeCallback = this.startAnimation;
      }

      this.setState({
        currentSlideIndex: nextSlide,
        maxScore: this.props.slides[nextSlide].maxScore,
        targetScore: this.props.slides[nextSlide].score
      }, stateChangeCallback);
    }
  }, {
    key: "displayMarkers",
    value: function displayMarkers() {
      var _this4 = this;

      if (this.props.slides.length <= 1) {
        return null;
      }

      return this.props.slides.map(function (slideData, index) {
        var className = cn('marker');

        if (index === _this4.state.currentSlideIndex) {
          className += " " + cn('marker-selected');
        }

        return _react.default.createElement("div", {
          key: "slide-".concat(index),
          className: className
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.currentCoefficientStroke || !this.state.currentCoefficientNumber || !this.state.maxScore) {
        return null;
      }

      var radius = this.getRadius(this.props.size);
      var strokeWidth = this.props.strokeWidth || 3;
      var spaceToEdge = 4;
      var angle = this.state.currentCoefficientStroke * 360;

      if (angle % 360 === 0) {
        angle = 359.9;
      }

      return _react.default.createElement("div", {
        className: cn(null, "main-".concat(this.props.size)),
        style: this.props.style,
        onClick: this.onSlideClick
      }, _react.default.createElement("div", {
        className: cn('bg')
      }), _react.default.createElement("div", {
        className: cn('border')
      }), _react.default.createElement(_SVGArc.default, {
        strokeWidth: strokeWidth,
        radius: radius - strokeWidth - spaceToEdge,
        angle: angle,
        color: this.props.slides[this.state.currentSlideIndex].color
      }), _react.default.createElement("div", {
        className: cn('content')
      }, _react.default.createElement("div", {
        className: cn('reel'),
        style: {
          left: "-".concat(this.state.currentSlideIndex * radius * 2, "px"),
          width: "".concat(this.props.slides.length * radius * 2, "px")
        }
      }, this.displayContentReel())), _react.default.createElement("div", {
        className: cn('marker-container')
      }, this.displayMarkers()));
    }
  }]);

  _inherits(Slide, _Component);

  return Slide;
}(_react.Component);

exports.default = Slide;
module.exports = exports["default"];
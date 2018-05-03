"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _bem = _interopRequireDefault(require("../../utils/bem"));

var _fetch = require("../../utils/fetch");

var _Constants = require("../../constants/Constants");

var _Slide = _interopRequireDefault(require("../Slide/Slide"));

require("./dashboard.scss");

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
  block: 'dashboard'
});

var Dashboard =
/*#__PURE__*/
function (_Component) {
  function Dashboard(props) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));
    _this.state = {
      score: null,
      error: null,
      windowWidth: 0
    };
    _this.fetchScoreData = _this.fetchScoreData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayMainSlide = _this.displayMainSlide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayMobileView = _this.displayMobileView.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayNonMobileView = _this.displayNonMobileView.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onWindowResize = _this.onWindowResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Dashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.score && !this.state.error) {
        this.fetchScoreData();
      }

      if (window) {
        window.addEventListener("resize", this.onWindowResize);
      }
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.setState({
        windowWidth: window.innerWidth
      });
    }
  }, {
    key: "fetchScoreData",
    value: function fetchScoreData() {
      var _this2 = this;

      (0, _fetch.getJSON)(_Constants.SCORE_DATA_URL).then(function (response) {
        _this2.setState({
          score: response
        });
      }, function (error) {
        _this2.setState({
          error: error
        });
      }).catch(function (error) {
        _this2.setState({
          error: error
        });
      });
    }
  }, {
    key: "displayMainSlide",
    value: function displayMainSlide(_ref) {
      var mobile = _ref.mobile;
      var scoreData = this.state.score.creditReportInfo;
      var slides = [{
        type: 'score',
        score: scoreData.score,
        maxScore: scoreData.maxScoreValue,
        color: '#a7ced1'
      }, {
        type: 'debt',
        score: scoreData.currentLongTermDebt,
        maxScore: scoreData.currentLongTermDebt * 2,
        color: '#FCD29F',
        change: scoreData.changeInLongTermDebt
      }];
      var top;

      if (mobile) {
        top = 'calc(4vh)';
      } else {
        top = 'calc(50vh - 150px)';
      }

      return _react.default.createElement(_Slide.default, {
        animate: true,
        size: "big",
        slides: slides,
        style: {
          top: top,
          left: 'calc(50vw - 150px)'
        }
      });
    }
  }, {
    key: "displayOffersSlide",
    value: function displayOffersSlide() {
      var slides = [{
        type: 'offers',
        score: 5,
        maxScore: 5,
        color: '#fff'
      }];
      return _react.default.createElement(_Slide.default, {
        animate: false,
        size: "small",
        slides: slides,
        style: {
          top: 'calc(50vh - 250px)',
          left: 'calc(50vw - 320px)'
        }
      });
    }
  }, {
    key: "displayBalanceSlide",
    value: function displayBalanceSlide() {
      if (window.innerHeight < 520) {
        return null;
      }

      var slides = [{
        type: 'balance',
        score: 1,
        maxScore: 1,
        color: '#fff'
      }];
      return _react.default.createElement(_Slide.default, {
        animate: false,
        size: "small",
        slides: slides,
        style: {
          top: 'calc(90vh - 140px)',
          left: 'calc(50vw - 85px)'
        }
      });
    }
  }, {
    key: "displayMobileView",
    value: function displayMobileView() {
      return _react.default.createElement("div", null, this.displayMainSlide({
        mobile: true
      }), this.displayBalanceSlide());
    }
  }, {
    key: "displayNonMobileView",
    value: function displayNonMobileView() {
      return _react.default.createElement("div", null, this.displayMainSlide({
        mobile: false
      }), this.displayOffersSlide());
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.error) {
        return 'There has been an error. Please try again later.';
      } else if (!this.state.score) {
        return null;
      }

      var content;

      if (window.innerWidth <= _Constants.breakpoints.TABLET) {
        content = this.displayMobileView();
      } else {
        content = this.displayNonMobileView();
      }

      return _react.default.createElement("div", {
        className: cn(null, 'main')
      }, content);
    }
  }]);

  _inherits(Dashboard, _Component);

  return Dashboard;
}(_react.Component);

exports.default = Dashboard;
module.exports = exports["default"];
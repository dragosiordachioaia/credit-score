"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Dashboard = _interopRequireDefault(require("./Dashboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component;
var scoreData = {
  creditReportInfo: {
    score: 514,
    maxScoreValue: 700,
    currentLongTermDebt: 1000,
    changeInLongTermDebt: -100
  }
};
describe('Dashboard component', function () {
  it('fetches data when loaded', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.fetchScoreData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchScoreData).toBeCalled();
  });
  it('onWindowResize changes state', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.setState = jest.fn();
    instance.onWindowResize();
    expect(instance.setState).toBeCalled();
  });
  it('displayMainSlide renders correctly on mobile', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.state.score = scoreData;
    var result = instance.displayMainSlide({
      mobile: true
    });
    expect(result).toMatchSnapshot();
  });
  it('displayMainSlide renders correctly on non mobile', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.state.score = scoreData;
    var result = instance.displayMainSlide({
      mobile: false
    });
    expect(result).toMatchSnapshot();
  });
  it('displayOffersSlide renders correctly', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.state.score = scoreData;
    var result = instance.displayOffersSlide();
    expect(result).toMatchSnapshot();
  });
  it('displayBalanceSlide renders correctly when height is small', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    global.innerHeight = 320;
    var instance = component.getInstance();
    instance.state.score = scoreData;
    var result = instance.displayBalanceSlide();
    expect(result).toMatchSnapshot();
  });
  it('displayBalanceSlide renders correctly when height is big enough', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    global.innerHeight = 800;
    var instance = component.getInstance();
    instance.state.score = scoreData;
    var result = instance.displayBalanceSlide();
    expect(result).toMatchSnapshot();
  });
  it('correctly renders error', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.state.error = true;
    var result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('correctly renders nothing when no score and no error', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.state.error = null;
    instance.state.score = null;
    var result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays mobile view', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    global.innerWidth = 320;
    instance.state.score = {};
    instance.displayMobileView = jest.fn().mockReturnValue('mobile_view');
    instance.displayNonMobileView = jest.fn().mockReturnValue('non_mobile_view');
    var result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays non-mobile view', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    global.innerWidth = 1024;
    instance.state.score = {};
    instance.displayMobileView = jest.fn().mockReturnValue('mobile_view');
    instance.displayNonMobileView = jest.fn().mockReturnValue('non_mobile_view');
    var result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('mobile view displays the right contents', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.displayMainSlide = jest.fn().mockReturnValue('main_slide');
    instance.displayBalanceSlide = jest.fn().mockReturnValue('balance_slide');
    var result = instance.displayMobileView();
    expect(result).toMatchSnapshot();
  });
  it('non-mobile view displays the right contents', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Dashboard.default, null));

    var instance = component.getInstance();
    instance.displayMainSlide = jest.fn().mockReturnValue('main_slide');
    instance.displayOffersSlide = jest.fn().mockReturnValue('offers_slide');
    var result = instance.displayNonMobileView();
    expect(result).toMatchSnapshot();
  });
});
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _TweenMax = _interopRequireDefault(require("gsap/TweenMax"));

var helperMethods = _interopRequireWildcard(require("./SlideHelper"));

var _Slide = _interopRequireDefault(require("./Slide"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

helperMethods.getScoreSlide = jest.fn().mockReturnValue('score-slide');
helperMethods.getOffersSlide = jest.fn().mockReturnValue('offers-slide');
helperMethods.getBalanceSlide = jest.fn().mockReturnValue('balance-slide');
helperMethods.getDebtSlide = jest.fn().mockReturnValue('debt-slide');
var slideScore = {
  type: 'score',
  score: 100,
  maxScore: 700,
  color: '#a7ced1'
};
var component;
describe('Slide component', function () {
  it('renders nothing right after being mounted', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when 1 slide', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.state = Object.assign(instance.state, {
      currentCoefficientStroke: 1,
      currentCoefficientNumber: 1,
      maxScore: 700
    });
    var renderResult = instance.render();
    expect(renderResult).toMatchSnapshot();
  });
  it('kills tweens on new props', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.onNewProps();
    expect(instance.killTweens).toBeCalled();
  });
  it('calls setState on new props', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.setState = jest.fn();
    instance.onNewProps();
    expect(instance.setState).toBeCalled();
  });
  it('calls onNewProps in componentDidMount', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.componentDidMount();
    expect(instance.onNewProps).toBeCalled();
  });
  it('kills tweens when unmounted', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.componentWillUnmount();
    expect(instance.killTweens).toBeCalled();
  });
  it('calls onNewProps if props change', function () {
    var oldProps = {
      size: 'big',
      slides: [slideScore]
    };
    var newProps = {
      size: 'big',
      slides: [slideScore, slideScore]
    };

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, oldProps));

    var instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.props = newProps;
    instance.componentDidUpdate(oldProps);
    expect(instance.onNewProps).toBeCalled();
  });
  it('does not call onNewProps if props do not change', function () {
    var oldProps = {
      size: 'big',
      slides: [slideScore]
    };
    var newProps = {
      size: 'big',
      slides: [slideScore]
    };

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, oldProps));

    var instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.props = newProps;
    instance.componentDidUpdate(oldProps);
    expect(instance.onNewProps).not.toBeCalled();
  });
  it('kills tweens on startAnimation', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.startAnimation();
    expect(instance.killTweens).toBeCalled();
  });
  it('kills tweens on startAnimation', function () {
    var slides = [slideScore];
    _TweenMax.default.to = jest.fn();

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    instance.startAnimation();
    expect(_TweenMax.default.to).toBeCalled();
  });
  it('correctly displays score slide', function () {
    var slides = [slideScore];

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: slides
    }));

    var instance = component.getInstance();
    var result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays offers slide', function () {
    var slide = Object.assign({}, slideScore, {
      type: 'offers'
    });

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slide]
    }));

    var instance = component.getInstance();
    var result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays debt slide', function () {
    var slide = Object.assign({}, slideScore, {
      type: 'debt'
    });

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slide]
    }));

    var instance = component.getInstance();
    var result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays balance slide', function () {
    var slide = Object.assign({}, slideScore, {
      type: 'balance'
    });

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slide]
    }));

    var instance = component.getInstance();
    var result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays nothing for unknown slide type', function () {
    var slide = Object.assign({}, slideScore, {
      type: 'unknown_slide'
    });

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slide]
    }));

    var instance = component.getInstance();
    var result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('properly returns radius', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slideScore]
    }));

    var instance = component.getInstance();
    var result;
    result = instance.getRadius('big');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('medium');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('small');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('superbig');
    expect(result).toMatchSnapshot();
  });
  it('correctly skips markers for 1 slide', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slideScore]
    }));

    var instance = component.getInstance();
    var result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
  it('correctly skips markers for no slides', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slideScore]
    }));

    var instance = component.getInstance();
    var result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays markers for 2 slides', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Slide.default, {
      animate: true,
      size: "big",
      slides: [slideScore, slideScore]
    }));

    var instance = component.getInstance();
    var result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
});
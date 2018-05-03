import React from 'react';
import renderer from 'react-test-renderer';
import TweenMax from 'gsap/TweenMax';

import * as helperMethods from './SlideHelper';

helperMethods.getScoreSlide = jest.fn().mockReturnValue('score-slide');
helperMethods.getOffersSlide = jest.fn().mockReturnValue('offers-slide');
helperMethods.getBalanceSlide = jest.fn().mockReturnValue('balance-slide');
helperMethods.getDebtSlide = jest.fn().mockReturnValue('debt-slide');

import Slide from './Slide';

const slideScore = {
  type: 'score',
  score: 100,
  maxScore: 700,
  color: '#a7ced1',
}

let component;

xdescribe('Slide component', () => {
  it('renders nothing right after being mounted', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('renders correctly when 1 slide', () => {
    const slides = [slideScore];

    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.state = Object.assign(instance.state, {
      currentCoefficientStroke: 1,
      currentCoefficientNumber: 1,
      maxScore: 700,
    });
    let renderResult = instance.render();
    expect(renderResult).toMatchSnapshot();
  });
  it('kills tweens on new props', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.onNewProps();
    expect(instance.killTweens).toBeCalled();
  });
  it('calls setState on new props', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.setState = jest.fn();
    instance.onNewProps();
    expect(instance.setState).toBeCalled();
  });
  it('calls onNewProps in componentDidMount', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.componentDidMount();
    expect(instance.onNewProps).toBeCalled();
  });
  it('kills tweens when unmounted', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.componentWillUnmount();
    expect(instance.killTweens).toBeCalled();
  });
  it('calls onNewProps if props change', () => {
    const oldProps = {
      size: 'big',
      slides: [slideScore],
    }
    const newProps = {
      size: 'big',
      slides: [slideScore, slideScore],
    }
    const component = renderer.create(
      <Slide {...oldProps}/>
    );
    let instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.props = newProps;

    instance.componentDidUpdate(oldProps);
    expect(instance.onNewProps).toBeCalled();
  });
  it('does not call onNewProps if props do not change', () => {
    const oldProps = {
      size: 'big',
      slides: [slideScore],
    }
    const newProps = {
      size: 'big',
      slides: [slideScore],
    }
    const component = renderer.create(
      <Slide {...oldProps}/>
    );
    let instance = component.getInstance();
    instance.onNewProps = jest.fn();
    instance.props = newProps;

    instance.componentDidUpdate(oldProps);
    expect(instance.onNewProps).not.toBeCalled();
  });
  it('kills tweens on startAnimation', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.killTweens = jest.fn();
    instance.startAnimation();
    expect(instance.killTweens).toBeCalled();
  });
  it('kills tweens on startAnimation', () => {
    const slides = [slideScore];
    TweenMax.to = jest.fn();
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    instance.startAnimation();
    expect(TweenMax.to).toBeCalled();
  });
  it('correctly displays score slide', () => {
    const slides = [slideScore];
    const component = renderer.create(
      <Slide animate={true} size='big' slides={slides}/>
    );
    let instance = component.getInstance();
    let result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays offers slide', () => {
    const slide = Object.assign({}, slideScore, {type: 'offers'});
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slide]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays debt slide', () => {
    const slide = Object.assign({}, slideScore, {type: 'debt'});
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slide]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays balance slide', () => {
    const slide = Object.assign({}, slideScore, {type: 'balance'});
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slide]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays nothing for unknown slide type', () => {
    const slide = Object.assign({}, slideScore, {type: 'unknown_slide'});
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slide]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayContentReel();
    expect(result).toMatchSnapshot();
  });
  it('properly returns radius', () => {
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slideScore]}/>
    );
    let instance = component.getInstance();
    let result;

    result = instance.getRadius('big');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('medium');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('small');
    expect(result).toMatchSnapshot();
    result = instance.getRadius('superbig');
    expect(result).toMatchSnapshot();
  });
  it('correctly skips markers for 1 slide', () => {
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slideScore]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
  it('correctly skips markers for no slides', () => {
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slideScore]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays markers for 2 slides', () => {
    const component = renderer.create(
      <Slide animate={true} size='big' slides={[slideScore, slideScore]}/>
    );
    let instance = component.getInstance();
    let result = instance.displayMarkers();
    expect(result).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import TweenMax from 'gsap/TweenMax';

import * as helperMethods from './SlideHelper';

const state = {
  currentCoefficientNumber: 0.7342857142857143,
  currentCoefficientStroke: 0.7325868639732143,
  currentSlideIndex: 0,
  maxScore: 700,
  targetScore: 514,
};
const props = {
  "animate": true,
  "size": "big",
  "radius": 150,
  "slides":[
    {"type":"score","score":514,"maxScore":700,"color":"#a7ced1"},
    {"type":"debt","score":24682,"maxScore":49364,"color":"#FCD29F","change":-327},
    {"type":"balance","score":24682,"maxScore":49364,"color":"#FCD29F"},
    {"type":"offers","score":24682,"maxScore":49364,"color":"#FCD29F"},
    {"type":"debt","score":24682,"maxScore":49364,"color":"#FCD29F","change":327},
    {"type":"debt","score":24682,"maxScore":49364,"color":"#FCD29F","change":0},
    {"type":"debt","score":75,"maxScore":100,"color":"#FCD29F","change":0},
  ],
};

describe('Slide helpers', () => {
  it('getScoreSlide renders correctly', () => {
    let currentState = Object.assign({}, state);
    const result = helperMethods.getScoreSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getOffersSlide renders correctly', () => {
    let currentState = Object.assign({}, state, {currentSlideIndex: 3});
    const result = helperMethods.getOffersSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getBalanceSlide renders correctly', () => {
    let currentState = Object.assign({}, state, {currentSlideIndex: 2});
    const result = helperMethods.getBalanceSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getDebtSlide renders correctly when change is negative', () => {
    let currentState = Object.assign({}, state, {currentSlideIndex: 1});
    const result = helperMethods.getDebtSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getDebtSlide renders correctly when change is positive', () => {
    let currentState = Object.assign({}, state, {currentSlideIndex: 4});
    const result = helperMethods.getDebtSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
  it('getDebtSlide renders correctly when no change', () => {
    let currentState = Object.assign({}, state, {currentSlideIndex: 5});
    const result = helperMethods.getDebtSlide(props, currentState);
    expect(result).toMatchSnapshot();
  });
});

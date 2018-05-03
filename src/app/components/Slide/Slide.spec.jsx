import React from 'react';
import renderer from 'react-test-renderer';

import * as helperMethods from './SlideHelper';

helperMethods.getScoreSlide = jest.fn().mockReturnValue('score-slide');
helperMethods.getOffersSlide = jest.fn().mockReturnValue('offers-slide');
helperMethods.getBalanceSlide = jest.fn().mockReturnValue('balance-slide');
helperMethods.getDebtSlide = jest.fn().mockReturnValue('debt-slide');

import Slide from './Slide';

let component;

describe('Slide component', () => {
  it('renders nothing right after being mounted', () => {
    const slides = [
      {
        type: 'score',
        score: 100,
        maxScore: 700,
        color: '#a7ced1',
      }
    ];
    const component = renderer.create(
      <Slide
        animate={true}
        size='big'
        slides={slides}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('renders correctly when 1 slide', () => {
    const slides = [
      {
        type: 'score',
        score: 100,
        maxScore: 700,
        color: '#a7ced1',
      }
    ];

    const component = renderer.create(
      <Slide
        animate={true}
        size='big'
        slides={slides}
      />
    );
    // const tree = component.toJSON();
    let instance = component.getInstance();
    instance.state = Object.assign(instance.state, {
      currentCoefficientStroke: 1,
      currentCoefficientNumber: 1,
      maxScore: 700,
    });
    let renderResult = instance.render();
    expect(renderResult).toMatchSnapshot();
  });
});

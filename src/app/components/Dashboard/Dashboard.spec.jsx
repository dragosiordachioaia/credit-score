import React from 'react';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard';

let component;

const scoreData = {
  creditReportInfo: {
    score: 514,
    maxScoreValue: 700,
    currentLongTermDebt: 1000,
    changeInLongTermDebt: -100,
  }
};

describe('Dashboard component', () => {
  it('fetches data when loaded', () => {
    const component = renderer.create(
      <Dashboard />
    );
    const instance = component.getInstance();
    instance.fetchScoreData = jest.fn();
    instance.componentDidMount();
    expect(instance.fetchScoreData).toBeCalled();
  });
  it('onWindowResize changes state', () => {
    const component = renderer.create(
      <Dashboard />
    );
    const instance = component.getInstance();
    instance.setState = jest.fn();
    instance.onWindowResize();
    expect(instance.setState).toBeCalled();
  });
  it('displayMainSlide renders correctly on mobile', () => {
    const component = renderer.create(
      <Dashboard />
    );
    const instance = component.getInstance();
    instance.state.score = scoreData;
    const result = instance.displayMainSlide({mobile: true});
    expect(result).toMatchSnapshot();
  });
  it('displayMainSlide renders correctly on non mobile', () => {
    const component = renderer.create(
      <Dashboard />
    );
    const instance = component.getInstance();
    instance.state.score = scoreData;
    const result = instance.displayMainSlide({mobile: false});
    expect(result).toMatchSnapshot();
  });
  it('displayOffersSlide renders correctly', () => {
    const component = renderer.create(
      <Dashboard />
    );
    const instance = component.getInstance();
    instance.state.score = scoreData;
    const result = instance.displayOffersSlide();
    expect(result).toMatchSnapshot();
  });
  it('displayBalanceSlide renders correctly when height is small', () => {
    const component = renderer.create(
      <Dashboard />
    );
    global.innerHeight = 320;
    const instance = component.getInstance();
    instance.state.score = scoreData;
    const result = instance.displayBalanceSlide();
    expect(result).toMatchSnapshot();
  });
  it('displayBalanceSlide renders correctly when height is big enough', () => {
    const component = renderer.create(
      <Dashboard />
    );
    global.innerHeight = 800;
    const instance = component.getInstance();
    instance.state.score = scoreData;
    const result = instance.displayBalanceSlide();
    expect(result).toMatchSnapshot();
  });
  it('correctly renders error', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    instance.state.error = true;
    const result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('correctly renders nothing when no score and no error', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    instance.state.error = null;
    instance.state.score = null;
    const result = instance.render();
    expect(result).toMatchSnapshot();
  });
  it('correctly displays mobile view', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    global.innerWidth = 320;
    instance.state.score = {};
    instance.displayMobileView = jest.fn().mockReturnValue('mobile_view');
    instance.displayNonMobileView = jest.fn().mockReturnValue('non_mobile_view');
    const result = instance.render();
    expect(result).toMatchSnapshot();
  });

  it('correctly displays non-mobile view', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    global.innerWidth = 1024;
    instance.state.score = {};
    instance.displayMobileView = jest.fn().mockReturnValue('mobile_view');
    instance.displayNonMobileView = jest.fn().mockReturnValue('non_mobile_view');
    const result = instance.render();
    expect(result).toMatchSnapshot();
  });

  it('mobile view displays the right contents', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    instance.displayMainSlide = jest.fn().mockReturnValue('main_slide');
    instance.displayBalanceSlide = jest.fn().mockReturnValue('balance_slide');
    const result = instance.displayMobileView();
    expect(result).toMatchSnapshot();
  });

  it('non-mobile view displays the right contents', () => {
    const component = renderer.create(
      <Dashboard />
    );

    const instance = component.getInstance();
    instance.displayMainSlide = jest.fn().mockReturnValue('main_slide');
    instance.displayOffersSlide = jest.fn().mockReturnValue('offers_slide');
    const result = instance.displayNonMobileView();
    expect(result).toMatchSnapshot();
  });
});

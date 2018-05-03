import React, { Component } from 'react';
import bemHelper from '../../utils/bem';

import { getJSON } from '../../utils/fetch';

import { SCORE_DATA_URL, breakpoints } from '../../constants/Constants';
import Slide from '../Slide/Slide';
import './dashboard.scss';

const cn = bemHelper({ block: 'dashboard' });

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      error: null,
      windowWidth: 0,
    };

    this.fetchScoreData = this.fetchScoreData.bind(this);
    this.displayMainSlide = this.displayMainSlide.bind(this);
    this.displayMobileView = this.displayMobileView.bind(this);
    this.displayNonMobileView = this.displayNonMobileView.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    if(!this.state.score && !this.state.error) {
      this.fetchScoreData();
    }
    if(window) {
      window.addEventListener("resize", this.onWindowResize);
    }
  }

  onWindowResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  fetchScoreData() {
    getJSON(SCORE_DATA_URL).then(
      response => {
        this.setState({score: response});
      },
      error => {
        this.setState({error});
      }
    ).catch(error => {
      this.setState({error});
    });
  }

  displayMainSlide({mobile}) {
    const scoreData = this.state.score.creditReportInfo;
    const slides = [
      {
        type: 'score',
        score: scoreData.score,
        maxScore: scoreData.maxScoreValue,
        color: '#a7ced1',
      },
      {
        type: 'debt',
        score: scoreData.currentLongTermDebt,
        maxScore: scoreData.currentLongTermDebt * 2,
        color: '#FCD29F',
        change: scoreData.changeInLongTermDebt
      }
    ];

    let top;
    if(mobile) {
      top = 'calc(4vh)';
    } else {
      top = 'calc(50vh - 150px)';
    }

    return (
      <Slide
        animate={true}
        size='big'
        slides={slides}
        style={{
          top,
          left: 'calc(50vw - 150px)'
        }}
      />
    );
  }

  displayOffersSlide() {
    const slides = [{
      type: 'offers',
      score: 5,
      maxScore: 5,
      color: '#fff',
    }];
    return (
      <Slide
        animate={false}
        size='small'
        slides={slides}
        style={{
          top: 'calc(50vh - 250px)',
          left: 'calc(50vw - 320px)'
        }}
      />
    );
  }

  displayBalanceSlide() {
    if(window.innerHeight < 520) {
      return null;
    }

    const slides = [{
      type: 'balance',
      score: 1,
      maxScore: 1,
      color: '#fff',
    }]
    return (
      <Slide
        animate={false}
        size='small'
        slides={slides}
        style={{
          top: 'calc(90vh - 140px)',
          left: 'calc(50vw - 85px)'
        }}
      />
    );
  }

  displayMobileView() {
    return (
      <div>
        {this.displayMainSlide({mobile: true})}
        {this.displayBalanceSlide()}
      </div>
    );
  }

  displayNonMobileView() {
    return (
      <div>
        {this.displayMainSlide({mobile: false})}
        {this.displayOffersSlide()}
      </div>
    );
  }

  render() {
    if(this.state.error) {
      return 'There has been an error. Please try again later.';
    } else if(!this.state.score) {
      return null;
    }

    let content;
    if(window.innerWidth <= breakpoints.TABLET) {
      content = this.displayMobileView();
    } else {
      content = this.displayNonMobileView();
    }

    return (
      <div className={cn(null, 'main')}>
        {content}
      </div>
    )
  }
}

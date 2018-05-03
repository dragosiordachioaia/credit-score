import React, { Component } from 'react';

import bemHelper from '../../utils/bem';

import { getJSON } from '../../utils/fetch';

import { SCORE_DATA_URL } from '../../constants/Constants';
import Slide from '../Slide/Slide';
import './dashboard.scss';

const cn = bemHelper({ block: 'dashboard' });

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      error: null,
    };

    this.fetchScoreData = this.fetchScoreData.bind(this);
    this.displayMainSlide = this.displayMainSlide.bind(this);
  }

  componentDidMount() {
    if(!this.state.score && !this.state.error) {
      this.fetchScoreData();
    }
  }

  fetchScoreData() {
    getJSON(SCORE_DATA_URL).then(
      response => {
        this.setState({score: response});
      },
      error => {
        this.setStatE({error});
      }
    )
  }

  displayMainSlide() {
    const slides = [
      {
        type: 'score',
        score: this.state.score.creditReportInfo.score,
        maxScore: this.state.score.creditReportInfo.maxScoreValue,
        color: '#a7ced1',
      },
      {
        type: 'debt',
        score: this.state.score.creditReportInfo.currentLongTermDebt,
        maxScore: this.state.score.creditReportInfo.currentLongTermDebt * 1.5,
        color: '#FF8E72',
      }
    ]
    return (
      <Slide
        animate={true}
        size='big'
        slides={slides}
        style={{
          top: 'calc(50vh - 150px)',
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
    }]
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

  render() {
    if(this.state.error) {
      return 'Error';
    } else if(!this.state.score) {
      return null;
    }

    return (
      <div className={cn(null, 'main')}>
        {this.displayMainSlide()}
        {this.displayOffersSlide()}
      </div>
    )
  }
}

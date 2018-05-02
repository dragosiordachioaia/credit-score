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
        console.log('success: ', response);
      },
      error => {
        this.setStatE({error});
      }
    )
  }

  displayMainSlide() {
    const color = '#80cddc';
    return (
      <Slide
        score={this.state.score.creditReportInfo.score}
        maxScore={this.state.score.creditReportInfo.maxScoreValue}
        radius={150}
        color={color}
        slides={['score']}
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
      </div>
    )
  }
}

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

  render() {
    // return null;

    return (
      <div className={cn(null, 'main')}>
        <Slide score={500} maxScore={700} radius={150}/>
      </div>
    )
  }
}

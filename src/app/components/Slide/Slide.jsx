import React, { Component } from 'react';

import bemHelper from '../../utils/bem';

import './slide.scss';

const cn = bemHelper({ block: 'slide' });

export default class Slide extends Component {
  constructor(props) {
    super(props);
    // this.fetchScoreData = this.fetchScoreData.bind(this);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={cn(null, 'main')}>
        <div className={cn('bg')}></div>
        <div className={cn('border')}></div>
        <p>Text here</p>
      </div>
    )
  }
}

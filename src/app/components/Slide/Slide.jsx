import React, { Component } from 'react';

import bemHelper from '../../utils/bem';

import './slide.scss';

const cn = bemHelper({ block: 'slide' });

import SVGArc from '../SVGArc/SVGArc';


export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endScore: 681,
      currentScore: 0,
      maxScore: 700,
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    if(this.state.currentScore < this.state.endScore - 2) {
      const difference = this.state.endScore - this.state.currentScore;
      let newCurrentScore = this.state.currentScore + 2;
      if(this.state.endScore - newCurrentScore < 2) {
        newCurrentScore = this.state.endScore;
      }
      setTimeout(() => {
        this.setState({currentScore: newCurrentScore});
      }, 10);
    }
  }

  render() {
    const stroke = '#80cddc';
    const radius = 130;
    const angle = (this.state.currentScore / this.state.maxScore) * 360;

    return (
      <div className={cn(null, 'main')}>
        <SVGArc
          radius={radius}
          angle={angle}
          color={"#80cddc"}
        />
      </div>
    )
  }
}

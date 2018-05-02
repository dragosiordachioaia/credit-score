import React, { Component } from 'react';

import bemHelper from '../../utils/bem';

import TweenMax from 'gsap/TweenMax';
import EaseTypes from 'gsap/EasePack';
import _ from 'underscore';

import './slide.scss';

const cn = bemHelper({ block: 'slide' });

import SVGArc from '../SVGArc/SVGArc';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetScore: 0,
      maxScore: 0,
      currentScore: 0,
    };
    this.animationDuration = 2;
    this.tweenCurrentScore = 0;
    this.tween = null;
    this.startAnimation = this.startAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    if(this.tween) {
      this.tween.kill();
    }
  }

  componentDidUpdate() {
    if(
      this.props.score !== this.state.targetScore ||
      this.props.maxScore !== this.state.maxScore
    ) {
      this.setState({
        targetScore: this.props.score,
        maxScore: this.props.maxScore,
      }, this.startAnimation);
    }
  }

  startAnimation() {
    if(this.tween) {
      this.tween.kill();
    }
    this.tweenCurrentScore = this.state.currentScore;
    this.tween = TweenMax.to(
      this,
      this.animationDuration,
      {
        tweenCurrentScore: this.state.targetScore,
        ease: EaseTypes.Bounce.easeOut,
        onUpdate: () => {
          this.setState({currentScore: this.tweenCurrentScore});
        }
      }
    );
  }

  render() {
    if(!this.state.currentScore || !this.state.maxScore) {
      return null;
    }
    const stroke = '#80cddc';
    const angle = (this.state.currentScore / this.state.maxScore) * 360;
    const strokeWidth = this.props.strokeWidth || 3;
    const spaceToEdge = 4;

    return (
      <div className={cn(null, 'main')}>
        <div className={cn('bg')}></div>
        <div className={cn('border')}></div>
        <SVGArc
          strokeWidth={strokeWidth}
          radius={this.props.radius - strokeWidth - spaceToEdge}
          angle={angle}
          color={"#80cddc"}
        />
      </div>
    )
  }
}

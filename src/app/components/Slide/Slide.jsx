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
      currentScoreToDisplay: 0,
      currentSlide: 0,
      slides: null,
    };
    this.animationDuration = 2;
    this.valueTweenScore = 0;
    this.valueTweenStroke = 0;
    this.tweenStroke = null;
    this.tweenScore = null;
    this.startAnimation = this.startAnimation.bind(this);
    this.displayContentReel = this.displayContentReel.bind(this);
    this.getScoreSlide = this.getScoreSlide.bind(this);
    this.killTweens = this.killTweens.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.killTweens();
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
    this.killTweens();

    this.valueTweenScore = this.state.currentScore;
    this.tweenScore = TweenMax.to(
      this,
      this.animationDuration,
      {
        valueTweenScore: this.state.targetScore,
        ease: EaseTypes.Strong.easeOut,
        onUpdate: () => {
          this.setState({
            currentScoreToDisplay: Math.round(this.valueTweenScore),
            currentScore: Math.round(this.valueTweenStroke)
          });
        }
      }
    );
    this.tweenStroke = TweenMax.to(
      this,
      this.animationDuration,
      {
        valueTweenStroke: this.state.targetScore,
        ease: EaseTypes.Bounce.easeOut,
      }
    );
  }

  killTweens() {
    if(this.tweenStroke) {
      this.tweenStroke.kill();
    }
    if(this.tweenScore) {
      this.tweenScore.kill();
    }
  }

  getScoreSlide() {
    return (
      <div
        key='slide-score'
        className={cn('individual-slide')}
        style={{width: `${this.props.radius * 2}px`}}
      >
        <p className={cn('small-text')}>
          Your credit score is
        </p>
        <h2 className={cn('score-text')} style={{color: this.props.color}}>
          {this.state.currentScoreToDisplay}
        </h2>
        <p className={cn('small-text')}>
          out of
          <b className={cn('max-score')}>{this.state.maxScore}</b>
        </p>
        <p
          className={cn('description-text')}
          style={{color: this.props.color}}
        >
          Soaring high
        </p>
      </div>
    )
  }

  displayContentReel() {
    return this.props.slides.map(slideName => {
      switch(slideName) {
        case 'score':
          return this.getScoreSlide();
        default:
          return null;
      }
    });
  }

  render() {
    if(
      !this.state.currentScore ||
      !this.state.currentScoreToDisplay ||
      !this.state.maxScore
    ) {
      return null;
    }
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
          color={this.props.color}
        />
        <div className={cn('content')}>
          <div
            className={cn('reel')}
            style={{left: `${this.state.currentSlide * this.props.radius}px`}}
          >
            {this.displayContentReel()}
          </div>
        </div>
      </div>
    )
  }
}

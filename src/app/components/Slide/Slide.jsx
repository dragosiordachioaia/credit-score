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
    this.onSlideClick = this.onSlideClick.bind(this);
    this.onNewProps = this.onNewProps.bind(this);
  }

  componentDidMount() {
    this.onNewProps();
  }

  onNewProps() {
    let newState = {
      targetScore: this.props.slides[0].score,
      maxScore: this.props.slides[0].maxScore,
      currentSlide: 0,
    };
    let stateChangeCallback = this.startAnimation;
    if(!this.props.animate) {
      this.killTweens();
      newState.currentScore = this.props.slides[0].score;
      newState.currentScoreToDisplay = newState.currentScore;
      stateChangeCallback = undefined;
    }

    this.setState(newState, stateChangeCallback);
  }

  componentWillUnmount() {
    this.killTweens();
  }

  componentDidUpdate(prevProps) {
    if(
      this.props.slides !== prevProps.slides
    ) {
      this.onNewProps();
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
        <h2
          className={cn('score-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}
        >
          {this.state.currentScoreToDisplay}
        </h2>
        <p className={cn('small-text')}>
          out of
          <b className={cn('max-score')}>{this.state.maxScore}</b>
        </p>
        <p
          className={cn('description-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}
        >
          Soaring high
        </p>
      </div>
    )
  }

  getOffersSlide() {
    return (
      <div
        key='slide-offers'
        className={cn('individual-slide')}
        style={{width: `${this.props.radius * 2}px`}}
      >
        <h2
          className={cn('score-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}
        >
          {this.state.currentScoreToDisplay}
        </h2>
        <p className={cn('small-text')}>
          New offers
        </p>
      </div>
    )
  }

  getDebtSlide() {
    return (
      <div
        key='slide-debt'
        className={cn('individual-slide')}
        style={{width: `${this.props.radius * 2}px`}}
      >
        <p className={cn('small-text')}>
          Your long term debt is
        </p>
        <h2
          className={cn('score-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}>
          £{this.state.currentScoreToDisplay}
        </h2>
        <p className={cn('small-text')}>
          Total credit limit {this.state.maxScore}
        </p>
        <p
          className={cn('description-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}
        >
          Down from last month
        </p>
      </div>
    )
  }

  displayContentReel() {
    return this.props.slides.map(slideData => {
      switch(slideData.type) {
        case 'score':
          return this.getScoreSlide();
        case 'offers':
          return this.getOffersSlide();
        case 'debt':
          return this.getDebtSlide();
        default:
          return null;
      }
    });
  }

  getRadius(size) {
    let radius;
    switch(size) {
      case 'big':
        radius = 150;
        break;
      case 'medium':
        radius = 120;
        break;

      case 'small':
        radius = 85;
        break;

      default:
        radius = 150;
    }
    return radius;
  }

  onSlideClick() {
    let nextSlide = this.state.currentSlide + 1;
    if(this.state.currentSlide >= this.props.slides.length - 1) {
      nextSlide = 0;
    }
    let stateChangeCallback;
    if(this.props.animate) {
      stateChangeCallback = this.startAnimation;
    }
    this.setState({
      currentSlide: nextSlide,
      maxScore: this.props.slides[nextSlide].maxScore,
      targetScore: this.props.slides[nextSlide].score,
    }, stateChangeCallback);
  }

  render() {
    if(
      !this.state.currentScore ||
      !this.state.currentScoreToDisplay ||
      !this.state.maxScore
    ) {
      return null;
    }
    let radius = this.getRadius(this.props.size);

    const angle = (this.state.currentScore / this.state.maxScore) * 360;
    const strokeWidth = this.props.strokeWidth || 3;
    const spaceToEdge = 4;

    return (
      <div
        className={cn(null, `main-${this.props.size}`)}
        style={this.props.style}
        onClick={this.onSlideClick}
      >
        <div className={cn('bg')}></div>
        <div className={cn('border')}></div>
        <SVGArc
          strokeWidth={strokeWidth}
          radius={radius - strokeWidth - spaceToEdge}
          angle={angle}
          color={this.props.slides[this.state.currentSlide].color}
        />
        <div className={cn('content')}>
          <div
            className={cn('reel')}
            style={{
              left: `-${this.state.currentSlide * radius * 2}px`,
              width: `${this.props.slides.length * radius * 2}px`
            }}
          >
            {this.displayContentReel()}
          </div>
        </div>
      </div>
    )
  }
}

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
      // the value that we want to display in the end, after the animation has ended
      targetScore: 0,

      // the maximum value that is possible to display, used to compute the coefficients
      maxScore: 0,

      // float between 0 and 1, to be used for showing the animated circular path
      currentCoefficientStroke: 0,

      // float between 0 and 1, to be used for displaying the big score text
      currentCoefficientNumber: 0,

      // the index of the current slide
      currentSlide: 0,
    };
    this.animationDuration = 2;

    // these are the intermediate values for the tweens; we declare them here
    // just to know about them
    this.valueTweenScore = 0;
    this.valueTweenStroke = 0;

    // 
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
      newState.currentCoefficientStroke = this.props.slides[0].score / this.props.slides[0].maxScore;
      newState.currentCoefficientNumber = newState.currentCoefficientStroke;
      stateChangeCallback = undefined;
    }

    this.setState(newState, stateChangeCallback);
  }

  componentWillUnmount() {
    this.killTweens();
  }

  componentDidUpdate(prevProps) {
    // this should probable be done in a smarter way
    if(JSON.stringify(this.props.slides) !== JSON.stringify(prevProps.slides)) {
      this.onNewProps();
    }
  }

  startAnimation() {
    this.killTweens();
    this.valueTweenScore = this.state.currentCoefficientStroke / this.state.maxScore;
    this.tweenScore = TweenMax.to(
      this,
      this.animationDuration,
      {
        valueTweenScore: this.state.targetScore / this.state.maxScore,
        ease: EaseTypes.Strong.easeOut,
        onUpdate: () => {
          this.setState({
            currentCoefficientNumber: this.valueTweenScore,
            currentCoefficientStroke: this.valueTweenStroke
          });
        }
      }
    );
    this.tweenStroke = TweenMax.to(
      this,
      this.animationDuration,
      {
        valueTweenStroke: this.state.targetScore / this.state.maxScore,
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
    const crtSlide = this.props.slides[this.state.currentSlide];
    const crtScoreToDisplay = this.state.currentCoefficientNumber *crtSlide.maxScore;

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
          {Math.round(crtScoreToDisplay)}
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
    const crtSlide = this.props.slides[this.state.currentSlide];
    const crtScoreToDisplay = this.state.currentCoefficientNumber *crtSlide.maxScore;

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
          {Math.round(crtScoreToDisplay)}
        </h2>
        <p className={cn('small-text')}>
          New offers
        </p>
      </div>
    )
  }

  getBalanceSlide() {
    return (
      <div
        key='slide-offers'
        className={cn('individual-slide')}
        style={{width: `${this.props.radius * 2}px`}}
      >
        <img src='/cards.png' className={cn('cards')}></img>
        <p className={cn('small-text')}>
          Transfer your <br /> balance!
        </p>
      </div>
    )
  }

  getDebtSlide() {
    const crtSlide = this.props.slides[this.state.currentSlide];
    const crtScoreToDisplay = this.state.currentCoefficientNumber *crtSlide.maxScore;

    let changeText = `£${Math.abs(crtSlide.change)}`;
    if(crtSlide.change < 0) {
      changeText = `-${changeText}`;
    }

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
          £{Math.round(crtScoreToDisplay)}
        </h2>
        <p className={cn('small-text')}>
          Change since last check: <b>{changeText}</b>
        </p>
        <p
          className={cn('description-text')}
          style={{color: this.props.slides[this.state.currentSlide].color}}
        >
          You're doing great!
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
        case 'balance':
          return this.getBalanceSlide();
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
      !this.state.currentCoefficientStroke ||
      !this.state.currentCoefficientNumber ||
      !this.state.maxScore
    ) {
      return null;
    }
    let radius = this.getRadius(this.props.size);

    let angle = this.state.currentCoefficientStroke * 360;
    if(angle % 360 === 0) {
      angle = 359.9;
    }
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

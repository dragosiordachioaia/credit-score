import React, { Component } from 'react';
import bemHelper from '../../utils/bem';
import TweenMax from 'gsap/TweenMax';
import EaseTypes from 'gsap/EasePack';

import { slideSizes } from '../../constants/Constants';

import {
  getScoreSlide,
  getOffersSlide,
  getBalanceSlide,
  getDebtSlide,
} from './SlideHelper';
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
      currentSlideIndex: 0,
    };
    this.animationDuration = 2;

    // these are the intermediate values for the tweens; we declare them here
    // just to know about them
    this.valueTweenScore = 0;
    this.valueTweenStroke = 0;

    // we need to keep a reference to the tween objects so we can kill them when unmounting
    this.tweenStroke = null;
    this.tweenScore = null;

    this.startAnimation = this.startAnimation.bind(this);
    this.displayContentReel = this.displayContentReel.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
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
      currentSlideIndex: 0,
    };
    let stateChangeCallback = this.startAnimation;
    this.killTweens();
    if(!this.props.animate) {
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

    this.tweenScore = TweenMax.to(
      this,
      this.animationDuration,
      {
        valueTweenScore: this.state.targetScore / this.state.maxScore,
        ease: EaseTypes.Strong.easeOut,
        // we use the update handle from this tween to update both values instead
        // of doing it for both tweens in order to avoid re-rendering twice per cycle
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

  displayContentReel() {
    return this.props.slides.map(slideData => {
      switch(slideData.type) {
        case 'score':
          return getScoreSlide(this.props, this.state);
        case 'offers':
          return getOffersSlide(this.props, this.state);
        case 'debt':
          return getDebtSlide(this.props, this.state);
        case 'balance':
          return getBalanceSlide(this.props, this.state);
        default:
          return null;
      }
    });
  }

  getRadius(size) {
    let radius = slideSizes.big;
    if(slideSizes.hasOwnProperty(size)) {
      radius = slideSizes[size];
    }
    return radius;
  }

  onSlideClick() {
    let nextSlide = this.state.currentSlideIndex + 1;
    if(this.state.currentSlideIndex >= this.props.slides.length - 1) {
      nextSlide = 0;
    }
    let stateChangeCallback;
    if(this.props.animate) {
      stateChangeCallback = this.startAnimation;
    }
    this.setState({
      currentSlideIndex: nextSlide,
      maxScore: this.props.slides[nextSlide].maxScore,
      targetScore: this.props.slides[nextSlide].score,
    }, stateChangeCallback);
  }

  displayMarkers() {
    if(this.props.slides.length <= 1) {
      return null;
    }
    return this.props.slides.map((slideData, index) => {
      let className = cn('marker');
      if(index === this.state.currentSlideIndex) {
        className += " " + cn('marker-selected');
      }
      return (
        <div key={`slide-${index}`} className={className}></div>
      )
    });
  }

  render() {
    if(
      !this.state.currentCoefficientStroke ||
      !this.state.currentCoefficientNumber ||
      !this.state.maxScore
    ) {
      return null;
    }

    const radius = this.getRadius(this.props.size);
    const strokeWidth = this.props.strokeWidth || 3;
    const spaceToEdge = 4;

    let angle = this.state.currentCoefficientStroke * 360;
    if(angle % 360 === 0) {
      angle = 359.9;
    }

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
          color={this.props.slides[this.state.currentSlideIndex].color}
        />
        <div className={cn('content')}>
          <div
            className={cn('reel')}
            style={{
              left: `-${this.state.currentSlideIndex * radius * 2}px`,
              width: `${this.props.slides.length * radius * 2}px`
            }}
          >
            {this.displayContentReel()}
          </div>
        </div>
        <div className={cn('marker-container')}>
          {this.displayMarkers()}
        </div>
      </div>
    )
  }
}

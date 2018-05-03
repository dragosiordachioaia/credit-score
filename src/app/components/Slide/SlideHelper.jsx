import React from 'react';
import bemHelper from '../../utils/bem';

const cn = bemHelper({ block: 'slide' });

export const getScoreSlide = (props, state) => {
  const currentSlideData = props.slides[state.currentSlideIndex];
  const crtScoreToDisplay = state.currentCoefficientNumber * currentSlideData.maxScore;

  return (
    <div
      key='slide-score'
      className={cn('individual-slide')}
      style={{width: `${props.radius * 2}px`}}
    >
      <p className={cn('small-text')}>
        Your credit score is
      </p>
      <h2
        className={cn('score-text')}
        style={{color: props.slides[state.currentSlideIndex].color}}
      >
        {Math.round(crtScoreToDisplay)}
      </h2>
      <p className={cn('small-text')}>
        out of
        <b className={cn('max-score')}>{state.maxScore}</b>
      </p>
      <p
        className={cn('description-text')}
        style={{color: props.slides[state.currentSlideIndex].color}}
      >
        Soaring high
      </p>
    </div>
  )
}

export const getOffersSlide = (props, state) => {
  const currentSlideData = props.slides[state.currentSlideIndex];
  const crtScoreToDisplay = state.currentCoefficientNumber * currentSlideData.maxScore;

  return (
    <div
      key='slide-offers'
      className={cn('individual-slide')}
      style={{width: `${props.radius * 2}px`}}
    >
      <h2
        className={cn('score-text')}
        style={{color: props.slides[state.currentSlideIndex].color}}
      >
        {Math.round(crtScoreToDisplay)}
      </h2>
      <p className={cn('small-text')}>
        New offers
      </p>
    </div>
  )
}

export const getBalanceSlide = (props, state) => {
  return (
    <div
      key='slide-offers'
      className={cn('individual-slide')}
      style={{width: `${props.radius * 2}px`}}
    >
      <img src='/cards.png' className={cn('cards')}></img>
      <p className={cn('small-text')}>
        Transfer your <br /> balance!
      </p>
    </div>
  )
}

export const getDebtSlide = (props, state) => {
  const currentSlideData = props.slides[state.currentSlideIndex];
  const crtScoreToDisplay = state.currentCoefficientNumber *currentSlideData.maxScore;

  let changeText = `£${Math.abs(currentSlideData.change)}`;
  if(currentSlideData.change < 0) {
    changeText = `-${changeText}`;
  }

  return (
    <div
      key='slide-debt'
      className={cn('individual-slide')}
      style={{width: `${props.radius * 2}px`}}
    >
      <p className={cn('small-text')}>
        Your long term debt is
      </p>
      <h2
        className={cn('score-text')}
        style={{color: props.slides[state.currentSlideIndex].color}}>
        £{Math.round(crtScoreToDisplay)}
      </h2>
      <p className={cn('small-text')}>
        Change since last check: <b>{changeText}</b>
      </p>
      <p
        className={cn('description-text')}
        style={{color: props.slides[state.currentSlideIndex].color}}
      >
        You're doing great!
      </p>
    </div>
  )
}

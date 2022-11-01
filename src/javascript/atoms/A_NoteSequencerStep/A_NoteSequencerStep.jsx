import './A_NoteSequencerStep.scss'

import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_NoteSequencerStep extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isOn,
      currentStep,
      handleClick,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp
    } = this.props

    const classes = classnames({
      A_NoteSequencerStep: true,
      currentStep: currentStep
    })

    return (
      <div
        className={classes}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    )
  }
}

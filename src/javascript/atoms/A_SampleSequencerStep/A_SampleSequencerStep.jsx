import './A_SampleSequencerStep.scss'

import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_SampleSequencerStep extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { isOn, currentStep, handleClick } = this.props

    const classes = classnames({
      A_SampleSequencerStep: true,
      isOn: isOn,
      currentStep: currentStep
    })

    return <div className={classes} onClick={handleClick} />
  }
}

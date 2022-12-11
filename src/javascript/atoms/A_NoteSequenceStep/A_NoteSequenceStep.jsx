import './A_NoteSequenceStep.scss'

import classnames from 'classnames'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class A_NoteSequenceStep extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const { id, handleClick } = this.props
    handleClick(id)
  }

  render() {
    const { sequenceStep, stepWidth } = this.props
    const { step, duration, temporary } = sequenceStep
    const left = step * stepWidth + step * 2
    let noteWidth = stepWidth

    if (duration > 1) {
      noteWidth = duration * stepWidth + (duration - 1) * 2
    }

    const classes = classnames({
      A_NoteSequenceStep: true,
      temporary: temporary
    })

    const style = {
      left: [left, 'px'].join(''),
      width: [noteWidth, 'px'].join('')
    }

    return <div className={classes} style={style} onClick={this.handleClick} />
  }
}

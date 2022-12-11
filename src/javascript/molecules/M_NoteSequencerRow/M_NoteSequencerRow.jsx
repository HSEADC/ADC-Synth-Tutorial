import './M_NoteSequencerRow.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import A_NoteSequencerStep from '../../atoms/A_NoteSequencerStep/A_NoteSequencerStep.jsx'
import A_NoteSequenceStep from '../../atoms/A_NoteSequenceStep/A_NoteSequenceStep.jsx'

export default class M_NoteSequencerRow extends Component {
  constructor(props) {
    super(props)
  }

  renderNoteSequencerSteps = () => {
    const {
      octave,
      note,
      ticksPlayed,
      loopDuration,
      stepDuration,
      handleStepClick,
      handleStepMouseDown,
      handleStepMouseMove,
      handleStepMouseUp
    } = this.props

    const elements = []

    ;(loopDuration * stepDuration).times((i) => {
      const args = [octave, note, i]

      elements.push(
        <A_NoteSequencerStep
          currentStep={ticksPlayed === i ? true : false}
          handleClick={() => {
            handleStepClick(...args)
          }}
          handleMouseDown={() => {
            handleStepMouseDown(...args)
          }}
          handleMouseMove={() => {
            handleStepMouseMove(...args)
          }}
          handleMouseUp={() => {
            handleStepMouseUp(...args)
          }}
          key={i}
        />
      )
    })

    return elements
  }

  renderNoteSequenceSteps = () => {
    const {
      octave,
      note,
      ticksPlayed,
      loopDuration,
      stepDuration,
      sequence,
      stepWidth,
      handleSequenceStepClick
    } = this.props

    const elements = []

    Object.keys(sequence).forEach((key, i) => {
      if (sequence[key].octave === octave && sequence[key].note === note) {
        elements.push(
          <A_NoteSequenceStep
            id={key}
            sequenceStep={sequence[key]}
            stepWidth={stepWidth}
            handleClick={handleSequenceStepClick}
            key={i}
          />
        )
      }
    })

    return elements
  }

  render() {
    const { octave, note, sequence } = this.props

    return (
      <div className="M_NoteSequencerRow">
        <div className="C_NoteSequencerSteps">
          {this.renderNoteSequencerSteps()}
        </div>

        <div className="C_NoteSequenceSteps">
          {this.renderNoteSequenceSteps()}
        </div>
      </div>
    )
  }
}

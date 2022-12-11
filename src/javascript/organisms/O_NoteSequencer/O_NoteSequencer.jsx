import './O_NoteSequencer.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_NoteSequencerPianoKeyboard from '../../molecules/M_NoteSequencerPianoKeyboard/M_NoteSequencerPianoKeyboard.jsx'
import M_NoteSequencerRow from '../../molecules/M_NoteSequencerRow/M_NoteSequencerRow.jsx'

export default class O_NoteSequencer extends Component {
  constructor(props) {
    super(props)
  }

  renderNoteSequencerPianoKeyboards = () => {
    const { octaves, handleNoteClick } = this.props
    const elements = []

    ;(octaves).times((i) => {
      elements.push(
        <M_NoteSequencerPianoKeyboard
          octave={i}
          handleNoteClick={handleNoteClick}
          key={['octave', i].join('')}
        />
      )
    })

    return elements.reverse()
  }

  renderNoteSequencerOctaveGrid = () => {
    const {
      octaves,
      ticksPlayed,
      loopDuration,
      stepDuration,
      sequence,
      stepWidth,
      handleStepClick,
      handleStepMouseDown,
      handleStepMouseMove,
      handleStepMouseUp,
      handleSequenceStepClick
    } = this.props

    const octaveGrid = []

    ;(octaves).times((octave) => {
      // prettier-ignore
      const pianoKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      const noteSequencerRows = []

      pianoKeys.reverse().forEach((pianoKey, i) => {
        noteSequencerRows.push(
          <M_NoteSequencerRow
            octave={octave}
            note={pianoKey}
            ticksPlayed={ticksPlayed}
            loopDuration={loopDuration}
            stepDuration={stepDuration}
            sequence={sequence}
            stepWidth={stepWidth}
            handleStepClick={handleStepClick}
            handleStepMouseDown={handleStepMouseDown}
            handleStepMouseMove={handleStepMouseMove}
            handleStepMouseUp={handleStepMouseUp}
            handleSequenceStepClick={handleSequenceStepClick}
            key={[pianoKey, octave].join('')}
          />
        )
      })

      octaveGrid.push(
        <div className="C_NoteSequencerOctaveGrid" key={octave}>{noteSequencerRows}</div>
      )
    })

    return octaveGrid.reverse()
  }

  render() {
    return (
      <div className="O_NoteSequencer">
        <div className="W_NoteSequencerScroller">
          <div className="C_NoteSequencerPianoKeyboards">
            {this.renderNoteSequencerPianoKeyboards()}
          </div>

          <div className="C_NoteSequencerGrid">
            {this.renderNoteSequencerOctaveGrid()}
          </div>
        </div>
      </div>
    )
  }
}

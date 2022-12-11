import './M_NoteSequencerPianoKeyboard.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../../atoms/A_Button/A_Button.jsx'

export default class M_NoteSequencerPianoKeyboard extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderKeys = (type, notes) => {
    const { octave, handleNoteClick } = this.props
    const elements = []

    notes.reverse().forEach((note, i) => {
      elements.push(
        <A_Button
          type={type}
          handleClick={() => {
            handleNoteClick([note, octave].join(''))
          }}
          key={[note, octave].join('')}
        />
      )
    })

    return elements
  }

  render() {
    // prettier-ignore
    const pianoKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    return (
      <div className="M_NoteSequencerPianoKeyboard">
        {this.renderKeys('pianoKey', pianoKeys)}
      </div>
    )
  }
}

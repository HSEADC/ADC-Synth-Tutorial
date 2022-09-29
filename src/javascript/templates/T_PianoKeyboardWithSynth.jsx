import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeader from '../molecules/M_InstrumentHeader/M_InstrumentHeader.jsx'
import O_PianoKeyboard from '../organisms/O_PianoKeyboard/O_PianoKeyboard.jsx'
import A_InstrumentConnectionArrow from '../atoms/A_InstrumentConnectionArrow/A_InstrumentConnectionArrow.jsx'

let synth

export default class T_PianoKeyboardWithSynth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created: false
    }
  }

  createSynth = () => {
    synth = new Tone.Synth().toDestination()
  }

  playNote = (note) => {
    synth.triggerAttackRelease(note, '1')
  }

  handleClick = (note) => {
    let { created } = this.state

    if (!created) {
      this.createSynth()
      created = true
    }

    this.playNote(note)

    this.setState({
      created
    })
  }

  render() {
    return (
      <div className="T_OscillatorFrequency">
        <M_InstrumentHeader text="Piano Keyboard" />
        <O_PianoKeyboard handleClick={this.handleClick} />
        <A_InstrumentConnectionArrow />
        <M_InstrumentHeader text="Tone Synth" />
      </div>
    )
  }
}

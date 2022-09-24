import * as Tone from 'tone'
import React, { PureComponent } from 'react'

import { generateUniqId } from '../utilities.js'

import Button from '../control_components/Button.jsx'
import PianoButton from '../control_components/PianoButton.jsx'

import WelcomeScreen from '../views/WelcomeScreen.jsx'
// import KeyboardModule from '../views/KeyboardModule.jsx'
import Keyboard from '../module_components/Keyboard.jsx'

export default class KeyboardContainer extends PureComponent {
  constructor(props) {
    super(props)

    let notes = [
      {
        note: 'C',
        key: 'a',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'C#',
        key: 'w',
        isPlaying: false,
        className: 'PianoBlackKey'
      },
      {
        note: 'D',
        key: 's',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'D#',
        key: 'e',
        isPlaying: false,
        className: 'PianoBlackKey'
      },
      {
        note: 'E',
        key: 'd',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'F',
        key: 'f',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'F#',
        key: 't',
        isPlaying: false,
        className: 'PianoBlackKey'
      },
      {
        note: 'G',
        key: 'g',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'G#',
        key: 'y',
        isPlaying: false,
        className: 'PianoBlackKey'
      },
      {
        note: 'A',
        key: 'h',
        isPlaying: false,
        className: 'PianoWhiteKey'
      },
      {
        note: 'A#',
        key: 'u',
        isPlaying: false,
        className: 'PianoBlackKey'
      },
      {
        note: 'B',
        key: 'j',
        isPlaying: false,
        className: 'PianoWhiteKey'
      }
    ]

    this.state = {
      webAudioStarted: false,
      instruments: [],
      keyboards: [
        {
          id: generateUniqId(),
          octave: 4,
          isPlaying: false,
          notes
        }
      ]
    }
  }

  componentDidMount() {
    this.initInstruments()
  }

  mergeNote = (id, key) => {
    const { notes, octave } = this.state.keyboards[0]
    let note = ''

    if (id <= 11) {
      note = notes[id].note + `${octave}`
    } else if (id >= 12) {
      note = notes[id].note + `${octave + 1}`
    }

    return note
  }

  startPlayingNote = (id, key) => {
    const { webAudioStarted } = this.state
    const { notes } = this.state.keyboards[0]

    if (webAudioStarted == false) {
      this.initWebAudio()
    }

    this.state.instruments[0].node.triggerAttack(this.mergeNote(id, key))
    notes[id].isPlaying = true
    notes[id].classList.push('on')
  }

  stopPlayingNote = (id, key) => {
    const { notes } = this.state.keyboards[0]
    this.state.instruments[0].node.triggerRelease()
    notes[id].isPlaying = false
    notes[id].classList.pop()
  }

  renderNoteButtons = (keys) => {
    const { notes } = this.state.keyboards[0]

    let noteButtons = []

    notes.forEach((note, i) => {
      noteButtons.push(
        <PianoButton
          text={note.note}
          handleDown={() => this.startPlayingNote(i, 'Black')}
          handleUp={() => this.stopPlayingNote(i, 'Black')}
          classes={note.className}
          typeOfButton={keys}
          key={i}
          buttonId={i}
        />
      )
    })

    return noteButtons
  }

  renderRoom = () => {
    const { instruments } = this.state
    let i = 0

    return <Keyboard renderNoteButtons={this.renderNoteButtons} />
  }

  initWebAudio = async () => {
    await Tone.start()

    this.setState({
      webAudioStarted: true
    })
  }

  initInstruments = () => {
    const melodySynthSettings = {
      volume: 0.8,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'amtriangle',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const melodySynthNode = new Tone.Synth(melodySynthSettings).toDestination()

    let a = 1

    const instruments = [
      {
        id: generateUniqId(),
        name: 'Melody Synth',
        type: 'ToneSynth',
        node: melodySynthNode,
        settings: melodySynthSettings
      }
    ]

    this.setState({
      instruments
    })
  }

  render() {
    const { webAudioStarted } = this.state

    return <div className="SynthContainer">{this.renderRoom()}</div>
  }
}

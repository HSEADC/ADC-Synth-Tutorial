import './O_PianoKeyboard.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../../atoms/A_Button/A_Button.jsx'

export default class O_PianoKeyboard extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = (note) => {
    const { handleClick } = this.props
    handleClick(note)
  }

  renderKeys = (type, notes) => {
    const elements = []

    notes.forEach((note, i) => {
      elements.push(
        <A_Button
          type={type}
          handleClick={() => {
            this.handleClick(note)
          }}
          key={Math.floor(Math.random() * 10000)}
        />
      )
    })

    return elements
  }

  render() {
    const blackKeysPart1 = ['C#4', 'D#4']
    const blackKeysPart2 = ['F#4', 'G#4', 'A#4']
    const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']

    return (
      <div className="O_PianoKeyboard">
        <div className="C_PianoBlackKeys">
          <div className="C_PianoBlackKeysPart">
            {this.renderKeys('pianoBlack', blackKeysPart1)}
          </div>

          <div className="C_PianoBlackKeysPart">
            {this.renderKeys('pianoBlack', blackKeysPart2)}
          </div>
        </div>

        <div className="C_PianoWhiteKeys">
          {this.renderKeys('pianoWhite', whiteKeys)}
        </div>
      </div>
    )
  }
}

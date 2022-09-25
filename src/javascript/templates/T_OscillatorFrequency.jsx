import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'

let oscillator

export default class T_OscillatorFrequency extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOn: false
    }
  }

  createOscillator = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const created = true

    oscillator = audioCtx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime)
    oscillator.connect(audioCtx.destination)
  }

  startOscillator = () => {
    oscillator.start()

    this.setState({
      isOn: true
    })
  }

  stopOscillator = () => {
    oscillator.stop()

    this.setState({
      isOn: false
    })
  }

  handleClick = () => {
    const { isOn } = this.state

    if (isOn) {
      this.stopOscillator()
    } else {
      this.createOscillator()
      this.startOscillator()
    }
  }

  render() {
    const { isOn } = this.state

    return (
      <div className="T_OscillatorFrequency">
        <M_InstrumentHeaderWithButton
          isOn={isOn}
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

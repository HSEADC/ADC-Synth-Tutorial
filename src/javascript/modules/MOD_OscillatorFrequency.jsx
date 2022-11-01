import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_Slider from '../molecules/M_Slider/M_Slider.jsx'
import M_CodeExample from '../molecules/M_CodeExample/M_CodeExample.jsx'

let audioCtx
let oscillator

export default class MOD_OscillatorFrequency extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOn: false,
      frequency: 440
    }
  }

  createOscillator = () => {
    const { frequency } = this.state
    const created = true

    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    oscillator = audioCtx.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    oscillator.connect(audioCtx.destination)
  }

  startOscillator = () => {
    oscillator.start()
  }

  stopOscillator = () => {
    oscillator.stop()
  }

  changeOscillatorFrequency = (value) => {
    oscillator.frequency.setValueAtTime(value, audioCtx.currentTime)
  }

  handleClick = () => {
    const { isOn } = this.state

    if (isOn) {
      this.stopOscillator()

      this.setState({
        isOn: false
      })
    } else {
      this.createOscillator()
      this.startOscillator()

      this.setState({
        isOn: true
      })
    }
  }

  handleInput = (e) => {
    const { isOn } = this.state
    const { value } = e.target

    if (isOn) {
      this.changeOscillatorFrequency(e.target.value)
    }

    this.setState({
      frequency: value
    })
  }

  generateCodeExample = (frequency) => {
    // prettier-ignore
    return `// Создаём аудио-контекст для воспроизведения звука
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

// Создаём осциллятор внутри аудио-контекста
const oscillator = audioCtx.createOscillator()

// Задаём осциллятору тип волны
oscillator.type = 'square'

// Задаём осциллятору частоту в герцах
oscillator.frequency.setValueAtTime(${frequency}, audioCtx.currentTime)

// Подключаем осциллятор к выводу звука (нашим колонкам)
oscillator.connect(audioCtx.destination)

// Запускаем осциллятор
oscillator.start()`
  }

  render() {
    const { isOn, frequency } = this.state
    const min = 0
    const max = 1000
    const step = 1

    return (
      <div className="MOD_OscillatorFrequency">
        <M_InstrumentHeaderWithButton
          text="Oscillator"
          isOn={isOn}
          handleClick={this.handleClick}
        />

        <M_Slider
          label="Frequency"
          description={`min: ${min}, max: ${max}, step: ${step}, value: ${frequency}`}
          min={min}
          max={max}
          step={step}
          value={frequency}
          handleInput={this.handleInput}
        />

        <M_CodeExample code={this.generateCodeExample(frequency)} />
      </div>
    )
  }
}

import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_CodeExample from '../molecules/M_CodeExample/M_CodeExample.jsx'

let synth

export default class MOD_ToneSynthTriggerNote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created: false
    }
  }

  createSynth = () => {
    synth = new Tone.Synth().toDestination()
  }

  playNote = () => {
    synth.triggerAttackRelease('C4', '1')
  }

  handleClick = () => {
    let { created } = this.state

    if (!created) {
      this.createSynth()
      created = true
    }

    this.playNote()

    this.setState({
      created
    })
  }

  generateCodeExample = () => {
    // prettier-ignore
    return `// Подключаем библиотеку Tone.js
import * as Tone from 'tone'

// Создаём синтезатор и подключаем к колонкам
const synth = new Tone.Synth().toDestination()

// Тригерим синтезатор при нажатии на кнопку плей
// Нота До четвёртой октавы (C4) длительностью в одну секунду (1)
synth.triggerAttackRelease('C4', '1')`
  }

  render() {
    return (
      <div className="MOD_ToneSynthTriggerNote">
        <M_InstrumentHeaderWithButton
          text="Tone Synth"
          isOn={false}
          handleClick={this.handleClick}
        />

        <M_CodeExample code={this.generateCodeExample()} />
      </div>
    )
  }
}

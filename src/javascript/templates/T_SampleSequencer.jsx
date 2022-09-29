import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_InstrumentHeader from '../molecules/M_InstrumentHeader/M_InstrumentHeader.jsx'
import O_SampleSequencerGrid from '../organisms/O_SampleSequencerGrid/O_SampleSequencerGrid.jsx'
import A_InstrumentConnectionArrow from '../atoms/A_InstrumentConnectionArrow/A_InstrumentConnectionArrow.jsx'

const samples = {
  A1: '00001-Linn-9000-BassDrumrum1.mp3',
  B1: '00002-Linn-9000-Clhh-1.mp3',
  C1: '00003-Linn-9000-Hhclose1.mp3',
  D1: '00012-Linn-9000-Ride1.mp3'
}

let sampler

export default class T_SampleSequencer extends Component {
  constructor(props) {
    super(props)

    const sequence = {}

    Object.keys(samples).forEach((sample, i) => {
      sequence[sample] = []
    })

    this.state = {
      created: false,
      sequence
    }
  }

  createSampler = () => {
    sampler = new Tone.Sampler({
      urls: samples,
      baseUrl: 'http://localhost:8080/samples/'
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2'], 0.5)
      // }
    }).toDestination()

    // sequence = [
    //   {
    //     time: '0:0:0',
    //     noteName: 'A1',
    //     duration: '1n',
    //     velocity: v
    //   }
    // ]
    //
    // part = new Tone.Part((time, note) => {
    //   sampler.triggerAttackRelease(
    //     note.noteName,
    //     note.duration,
    //     time,
    //     note.velocity
    //   )
    // }, sequence)
    //
    // part.loopEnd = '2m'
    // part.loop = true
  }

  handlePlayClick = () => {
    let { created } = this.state

    if (!created) {
      this.createSampler()
      created = true
    }

    this.setState({
      created
    })
  }

  updateSamplerSequence = () => {}

  undateSequencer = (note, step) => {
    const sequence = Object.assign({}, this.state.sequence)

    Object.keys(sequence).forEach((key, i) => {
      if (key === note) {
        const newSequence = [...sequence[key]]

        if (newSequence.includes(step)) {
          const index = newSequence.indexOf(step)
          newSequence.splice(index, 1)
        } else {
          newSequence.push(step)
        }

        sequence[key] = newSequence
      }
    })

    this.setState({ sequence })
  }

  handleStepClick = (note, step) => {
    this.undateSequencer(note, step)
  }

  render() {
    const { sequence } = this.state

    this.updateSamplerSequence()

    return (
      <div className="T_SampleSequencer">
        <M_InstrumentHeaderWithButton
          text="Sample Sequencer"
          handleClick={this.handlePlayClick}
        />

        <O_SampleSequencerGrid
          samples={samples}
          sequence={sequence}
          handleClick={this.handleStepClick}
        />

        <A_InstrumentConnectionArrow />
        <M_InstrumentHeader text="Sampler" />
      </div>
    )
  }
}

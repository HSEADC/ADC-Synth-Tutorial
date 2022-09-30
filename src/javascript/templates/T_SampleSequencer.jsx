import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_InstrumentHeader from '../molecules/M_InstrumentHeader/M_InstrumentHeader.jsx'
import O_SampleSequencerGrid from '../organisms/O_SampleSequencerGrid/O_SampleSequencerGrid.jsx'
import A_InstrumentConnectionArrow from '../atoms/A_InstrumentConnectionArrow/A_InstrumentConnectionArrow.jsx'

const samples = {
  A1: '00001-Linn-9000-BassDrumrum1', // 4
  // 'A#1': '00002-Linn-9000-Clhh-1',
  // B1: '00003-Linn-9000-Hhclose1',
  // C1: '00004-Linn-9000-Hhclose2',
  // 'C#1': '00005-Linn-9000-Hhopen1',
  // D1: '00006-Linn-9000-Hhopen2',
  'D#1': '00007-Linn-9000-Kick-2', // 5
  // E1: '00008-Linn-9000-Kick-1',
  // F1: '00009-Linn-9000-Kick',
  // 'F#1': '00010-Linn-9000-Ophh-2',
  // G1: '00011-Linn-9000-Ophh-1',
  // 'G#1': '00012-Linn-9000-Ride1',
  //
  // A2: '00013-Linn-9000-Ride3',
  // 'A#2': '00014-Linn-9000-Rim-2',
  // B2: '00015-Linn-9000-Rim',
  C2: '00016-Linn-9000-Snare-2', // 5
  // 'C#2': '00017-Linn-9000-Snare',
  // D2: '00018-Linn-9000-Snr',
  // 'D#2': '00019-Linn-9000-Stick',
  // E2: '00020-Linn-9000-Tom-1',
  // F2: '00021-Linn-9000-Tom-3',
  // 'F#2': '00022-Linn-9000-Tom-4',
  // G2: '00023-Linn-AdrenaLinn1-SnareDrum-3',
  'G#2': '00024-Linn-AdrenaLinn1-SnareDrum-7', // 4

  // A3: '00025-Linn-Linndrum-Ride',
  'A#3': '00026-Linn-Linndrum-SnareDrum', // 4
  // B3: '00027-Linn-Linndrum-SnareDruml',
  // C3: '00028-Pearl-Drum-X-Hat',
  // 'C#3': '00029-Pearl-Drum-X-Tom-7d',
  // D3: '00030-Pearl-Drum-X-Tom-7e',
  'D#3': '00031-Tama-RockStar-Ride', // 5
  // E3: '00032-Tama-RockStar-Snare',
  // F3: '00033-Tama-TS-206-Kick-Short-1B',
  // 'F#3': '00034-Tama-TS-206-Perc-Noise-Long-1',
  // G3: '00035-Tama-TS-206-Perc-Noise-Short-1',
  // 'G#3': '00036-Tama-TS-305-BassDrum-3',
  //
  // A4: '00037-Tama-TS-305-BassDrum-6',
  // 'A#4': '00038-Tama-TS-305-BassDrum-8',
  // B4: '00039-Tama-TS-305-Tom-3',
  // C4: '00040-Tama-TS-500-BassDrum1',
  'C#4': '00041-Vermona-DRM1-1', // 5
  // D4: '00042-Vermona-DRM1-10',
  // 'D#4': '00043-Vermona-DRM1-11',
  E4: '00044-Vermona-DRM1-16', // 4
  // F4: '00045-Vermona-DRM1-17',
  'F#4': '00046-Vermona-DRM1-MK3-BassDrum12', // 5
  // G4: '00047-Vermona-DRM1-MK3-BassDrum13',
  // 'G#4': '00048-Vermona-DRM1-MK3-BassDrum25',
  //
  // A5: '00049-Vermona-DRM1-MK3-BassDrum27',
  // 'A#5': '00050-Vermona-DRM1-MK3-BassDrum29',
  // B5: '00051-Vermona-DRM1-MK3-Clap01',
  // C5: '00052-Vermona-DRM1-MK3-Clap07',
  // 'C#5': '00053-Vermona-DRM1-MK3-Clap08',
  // D5: '00054-Vermona-DRM1-MK3-Clap09',
  // 'D#5': '00055-Vermona-DRM1-MK3-Clap10',
  E5: '00056-Vermona-DRM1-MK3-HH01', // 5
  F5: '00057-Vermona-DRM1-MK3-HH02' // 5
  // 'F#5': '00058-Vermona-DRM1-MK3-HH19',
  // G5: '00059-Vermona-DRM1-MK3-HH20',
  // 'G#5': '00060-Vermona-DRM1-MK3-SnareDrum02',
  //
  // A6: '00061-Vermona-DRM1-MK3-SnareDrum03',
  // 'A#6': '00062-Vermona-DRM1-MK3-SnareDrum04',
  // B6: '00063-Vermona-DRM1-MK3-SnareDrum10',
  // C6: '00064-Vermona-DRM1-MK3-Tom13'
}

let sampler
let part

export default class T_SampleSequencer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created: false,
      playing: false,
      ticksPlayed: -1,
      sequence: this.setDefaultSequence()
    }
  }

  componentDidMount() {
    this.buferSamples()
  }

  setDefaultSequence = () => {
    const sequence = {}

    Object.keys(samples).forEach((sample, i) => {
      sequence[sample] = []
    })

    return sequence
  }

  buferSamples = () => {
    Object.keys(samples).forEach((note, i) => {
      const sample = new Tone.Buffer(`/samples/${samples[note]}.mp3`, () => {
        sample.get()
      })

      samples[note] = sample
    })
  }

  createSampler = () => {
    return new Promise(function (resolve, reject) {
      sampler = new Tone.Sampler({
        urls: samples,
        baseUrl: 'http://localhost:8080/samples/'
      }).toDestination()

      resolve()
    })
  }

  createPart = () => {
    return new Promise(function (resolve, reject) {
      part = new Tone.Part((time, note) => {
        sampler.triggerAttackRelease(
          note.noteName,
          note.duration,
          time,
          note.velocity
        )
      }, {})

      part.loopEnd = '2m'
      part.loop = true

      sampler.context.resume()
      resolve()
    })
  }

  transformToTransportTime = (step) => {
    // prettier-ignore
    const eights = [
      '0:0:0', '0:0:2', '0:1:0', '0:1:2',
      '0:2:0', '0:2:2', '0:3:0', '0:3:2',
      '1:0:0', '1:0:2', '1:1:0', '1:1:2',
      '1:2:0', '1:2:2', '1:3:0', '1:3:2'
    ]

    return eights[step]
  }

  togglePart = () => {
    const { playing, ticksPlayed } = this.state

    if (playing) {
      Tone.Transport.stop()
      this.updateTicksPlayed('stop')
      return false
    } else {
      Tone.Transport.start()

      Tone.Transport.scheduleRepeat(() => {
        this.updateTicksPlayed('tick')
      }, '8n')

      part.start(0)
      return true
    }
  }

  updateTicksPlayed = (type) => {
    let { ticksPlayed } = this.state

    if (type === 'stop') {
      ticksPlayed = -1
    } else {
      if (ticksPlayed >= 15) {
        ticksPlayed = 0
      } else {
        ticksPlayed++
      }
    }

    this.setState({
      ticksPlayed
    })
  }

  updateSamplerPart = () => {
    const { sequence } = this.state
    part.clear()

    Object.keys(sequence).forEach((note, i) => {
      sequence[note].forEach((step, i) => {
        part.add({
          time: this.transformToTransportTime(step),
          noteName: note,
          duration: '4n',
          velocity: 1
        })
      })
    })
  }

  undateSequence = (note, step) => {
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

  handlePlayClick = () => {
    let { created, playing } = this.state

    if (created) {
      playing = this.togglePart()

      this.setState({
        created,
        playing
      })
    } else {
      this.createSampler()
        .then(this.createPart)
        .then(() => {
          playing = this.togglePart()

          created = true

          this.setState({
            created,
            playing
          })
        })
    }
  }

  handleStepClick = (note, step) => {
    this.undateSequence(note, step)
  }

  render() {
    const { created, playing, ticksPlayed, sequence } = this.state

    {
      created ? this.updateSamplerPart() : ''
    }

    return (
      <div className="T_SampleSequencer">
        <M_InstrumentHeaderWithButton
          text="Sample Sequencer"
          isOn={playing}
          handleClick={this.handlePlayClick}
        />

        <O_SampleSequencerGrid
          samples={samples}
          sequence={sequence}
          ticksPlayed={playing ? ticksPlayed : ''}
          handleClick={this.handleStepClick}
        />

        <A_InstrumentConnectionArrow />
        <M_InstrumentHeader text="Sampler" />
      </div>
    )
  }
}

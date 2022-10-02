import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_InstrumentHeader from '../molecules/M_InstrumentHeader/M_InstrumentHeader.jsx'
import O_SampleSequencerGrid from '../organisms/O_SampleSequencerGrid/O_SampleSequencerGrid.jsx'
import A_InstrumentConnectionArrow from '../atoms/A_InstrumentConnectionArrow/A_InstrumentConnectionArrow.jsx'
import M_CodeExample from '../molecules/M_CodeExample/M_CodeExample.jsx'

const samples = {
  A1: 'Linn-9000-Bass-Drum',
  B1: 'Linn-9000-Kick',
  C1: 'Linn-9000-Snare',
  D1: 'Linn-AdrenaLinn-Snare',
  E1: 'Linn-LinnDrum-Snare',
  F1: 'Tama-RockStar-Ride',
  G1: 'Vermona-DRM1-High-Hat-Closed',
  A2: 'Vermona-DRM1-High-Hat-Open',
  B2: 'Vermona-DRM1-MK3-Bass-Drum',
  C2: 'Vermona-DRM1-MK3-High-Hat-Closed',
  D2: 'Vermona-DRM1-MK3-High-Hat-Open'
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
        baseUrl: process.env.ROOT_URL + 'samples/'
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
          duration: '8n',
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

  generateSamplerPartCode = () => {
    const { sequence } = this.state
    let stepCounter = 0

    const samplerPartCode = []

    Object.keys(sequence).forEach((note, i) => {
      sequence[note].forEach((step, i) => {
        const samplerPartNoteCode = []

        samplerPartNoteCode.push('  {')
        // prettier-ignore
        samplerPartNoteCode.push(`    time: '${this.transformToTransportTime(step)}',`)
        samplerPartNoteCode.push(`    noteName: '${note}',`)
        samplerPartNoteCode.push("    duration: '8n',")
        samplerPartNoteCode.push('    velocity: 1')
        samplerPartNoteCode.push('  }')

        samplerPartCode.push(samplerPartNoteCode.join('\r\n'))

        stepCounter++
      })
    })

    if (stepCounter > 0) {
      return samplerPartCode.join(',\r\n')
    } else {
      return '  // Здесь пока нет секвенции'
    }
  }

  generateCodeExample = () => {
    // prettier-ignore
    return `// Подключаем библиотеку Tone.js
import * as Tone from 'tone'

// Создаём семплер и добавляем в него семплы,
// которые лежат в папке ./src/samples
const sampler = new Tone.Sampler({
  urls: {
    A1: 'Linn-9000-Bass-Drum.mp3',
    B1: 'Linn-9000-Kick.mp3',
    C1: 'Linn-9000-Snare.mp3',
    D1: 'Linn-AdrenaLinn-Snare.mp3',
    E1: 'Linn-LinnDrum-Snare.mp3',
    F1: 'Tama-RockStar-Ride.mp3',
    G1: 'Vermona-DRM1-High-Hat-Closed.mp3',
    A2: 'Vermona-DRM1-High-Hat-Open.mp3',
    B2: 'Vermona-DRM1-MK3-Bass-Drum.mp3',
    C2: 'Vermona-DRM1-MK3-High-Hat-Closed.mp3',
    D2: 'Vermona-DRM1-MK3-High-Hat-Open.mp3'
  },
  baseUrl: 'https://hseadc.github.io/ADC-Synth-Tutorial/samples/'
}).toDestination()

// Описываем секвеницию в формате массива из объектов,
// в каждом их которых мы можем указать ноту, длительность,
// время, когда воспоизводить ноту, и громкость
const sequence = [
${this.generateSamplerPartCode()}
]

// Создаём партию, добавляем в неё секвенцию
// и включаем проигрывание
const part = new Tone.Part((time, note) => {
  sampler.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity
  )
}, sequence).start(0)

// Указываем длительность партии
part.loopEnd = '2m'

// Включаем зацикливание
part.loop = true

// Включаем звук в браузере
sampler.context.resume()

// Включаем отсчёт времени в Tone.js
Tone.Transport.start()
`
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

        <M_CodeExample code={this.generateCodeExample()} />
      </div>
    )
  }
}

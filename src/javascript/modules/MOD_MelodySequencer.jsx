import * as Tone from 'tone'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_InstrumentHeaderWithButton from '../molecules/M_InstrumentHeaderWithButton/M_InstrumentHeaderWithButton.jsx'
import M_InstrumentHeader from '../molecules/M_InstrumentHeader/M_InstrumentHeader.jsx'
import O_NoteSequencer from '../organisms/O_NoteSequencer/O_NoteSequencer.jsx'
import A_InstrumentConnectionArrow from '../atoms/A_InstrumentConnectionArrow/A_InstrumentConnectionArrow.jsx'
import M_CodeExample from '../molecules/M_CodeExample/M_CodeExample.jsx'

let melodySynth
let melodyPart

export default class MOD_MelodySequencer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created: false,
      playing: false,
      mouseDown: false,
      mouseRow: {},
      ticksPlayed: -1,
      loopDuration: 2,
      stepDuration: 8,
      sequence: {},
      stepWidth: 0
    }
  }

  componentDidMount() {
    const singleStep = document.querySelector(
      '.MOD_MelodySequencer .A_NoteSequencerStep'
    )

    this.setState({
      stepWidth: singleStep.getBoundingClientRect().width
    })
  }

  isEven = (n) => {
    return n % 2 == 0
  }

  createSynth = () => {
    return new Promise(function (resolve, reject) {
      melodySynth = new Tone.Synth().toDestination()
      resolve()
    })
  }

  createPart = () => {
    const { loopDuration } = this.state

    return new Promise(function (resolve, reject) {
      melodyPart = new Tone.Part((time, note) => {
        melodySynth.triggerAttackRelease(
          note.noteName,
          note.duration,
          time,
          note.velocity
        )
      }, {})

      melodyPart.loopEnd = [loopDuration, 'm'].join('')
      melodyPart.loop = true

      melodySynth.context.resume()
      resolve()
    })
  }

  transformToTransportTime = (step) => {
    const { loopDuration, stepDuration } = this.state
    let transportTime
    let bars = 0
    let quarters = 0
    let sixteenth = 0

    if (loopDuration === 1) {
      if (stepDuration === 1) {
      } else if (stepDuration === 4) {
        transportTime = `0:${step}:0`
      } else if (stepDuration === 8) {
        const quarters = Math.floor(step / 2)
        const sixteenth = this.isEven(step + 1) ? 2 : 0
        transportTime = `0:${quarters}:${sixteenth}`
      } else if (stepDuration === 16) {
        const quarters = Math.floor(step / 4)
        const sixteenth = quarters === 0 ? step : step - quarters * 4
        transportTime = `0:${quarters}:${sixteenth}`
      }
    } else {
      bars = Math.floor(step / stepDuration)

      const stepInMeasure =
        step >= stepDuration ? step - (loopDuration - 1) * stepDuration : step

      if (stepDuration === 1) {
      } else if (stepDuration === 4) {
        transportTime = `${bars}:${stepInMeasure}:0`
      } else if (stepDuration === 8) {
        const quarters = Math.floor(stepInMeasure / 2)
        const sixteenth = this.isEven(stepInMeasure + 1) ? 2 : 0
        transportTime = `${bars}:${quarters}:${sixteenth}`
      } else if (stepDuration === 16) {
        const quarters = Math.floor(stepInMeasure / 4)
        const sixteenth =
          quarters === 0 ? stepInMeasure : stepInMeasure - quarters * 4
        transportTime = `${bars}:${quarters}:${sixteenth}`
      }
    }

    return transportTime
  }

  transformToDuration = (duration) => {
    const { loopDuration, stepDuration } = this.state
    let noteDuration

    if (loopDuration === 1) {
      noteDuration = `${Math.ceil(stepDuration / duration)}n`
    } else {
      noteDuration = `${Math.ceil(stepDuration / duration)}n`
    }

    return noteDuration
  }

  updatePart = () => {
    const { sequence } = this.state
    melodyPart.clear()

    const s = []

    Object.keys(sequence).forEach((id, i) => {
      const { octave, note, step, duration, temporary } = sequence[id]

      melodyPart.add({
        time: this.transformToTransportTime(step),
        noteName: [note, octave].join(''),
        duration: this.transformToDuration(duration),
        velocity: 1
      })

      // s.push({
      //   time: this.transformToTransportTime(step),
      //   noteName: [note, octave].join(''),
      //   duration: this.transformToDuration(duration),
      //   velocity: 1
      // })
    })

    console.log(s)
  }

  togglePart = () => {
    const { playing, ticksPlayed, stepDuration } = this.state

    if (playing) {
      Tone.Transport.stop()
      this.updateTicksPlayed('stop')
      return false
    } else {
      Tone.Transport.start()

      Tone.Transport.scheduleRepeat(() => {
        this.updateTicksPlayed('tick')
        console.log('tick')
      }, [stepDuration, 'n'].join(''))

      melodyPart.start(0)
      return true
    }
  }

  updateTicksPlayed = (type) => {
    const { loopDuration, stepDuration } = this.state
    let { ticksPlayed } = this.state

    if (type === 'stop') {
      ticksPlayed = -1
    } else {
      if (ticksPlayed >= loopDuration * stepDuration - 1) {
        ticksPlayed = 0
      } else {
        ticksPlayed++
      }
    }

    this.setState({
      ticksPlayed
    })
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
      this.createSynth()
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

  handleNoteClick = (note) => {
    let { created } = this.state

    if (created) {
      melodySynth.triggerAttackRelease(note, 0.3)
    } else {
      this.createSynth()
        .then(this.createPart)
        .then(() => {
          created = true

          this.setState({
            created
          })

          melodySynth.triggerAttackRelease(note, 0.3)
        })
    }
  }

  handleStepClick = (octave, note, step) => {}

  handleStepMouseDown = (octave, note, step) => {
    // console.log('down', octave, note, step)

    const sequence = Object.assign({}, this.state.sequence)
    const id = Date.now()
    const duration = 1
    const temporary = true
    const newStep = { octave, note, step, duration, temporary }

    sequence[id] = newStep

    this.setState({
      mouseDown: true,
      mouseRow: {
        octave,
        note,
        startStep: step
      },
      sequence
    })
  }

  handleStepMouseMove = (octave, note, step) => {
    const { mouseDown, mouseRow } = this.state

    if (mouseDown && mouseRow.octave === octave && mouseRow.note === note) {
      // console.log('move', octave, note, step)

      const sequence = Object.assign({}, this.state.sequence)

      Object.keys(sequence).forEach((id, i) => {
        if (sequence[id].temporary) {
          const { startStep } = mouseRow
          const startDuration = sequence[id].duration

          if (step != startStep) {
            let nextDuration

            if (step > startStep) {
              // console.log(
              //   'move right',
              //   step,
              //   startStep,
              //   startDuration,
              //   step - startStep + 1
              // )

              nextDuration = step - startStep + 1
            } else if (step < startStep) {
              // console.log(
              //   'move left',
              //   step,
              //   startStep,
              //   startDuration,
              //   startStep - step + 1
              // )

              nextDuration = startStep - step + 1
              sequence[id].step = step
            }

            sequence[id].duration = nextDuration

            this.setState({
              sequence
            })
          }
        }
      })
    }
  }

  handleStepMouseUp = (octave, note, step) => {
    // console.log('up', octave, note, step)

    const sequence = Object.assign({}, this.state.sequence)

    Object.keys(sequence).forEach((id, i) => {
      // console.log(sequence[id], sequence[id].temporary)

      if (sequence[id].temporary) {
        sequence[id].temporary = false
      }
    })

    this.setState({
      mouseDown: false,
      mouseRow: null,
      sequence
    })
  }

  handleSequenceStepClick = (id) => {
    const sequence = Object.assign({}, this.state.sequence)
    delete sequence[id]

    this.setState({
      sequence
    })
  }

  generatePartCode = () => {
    const { sequence } = this.state
    let stepCounter = 0

    const samplerPartCode = []

    Object.keys(sequence).forEach((id, i) => {
      const { octave, note, step, duration, temporary } = sequence[id]
      const samplerPartNoteCode = []

      samplerPartNoteCode.push('  {')
      // prettier-ignore
      samplerPartNoteCode.push(`    time: '${this.transformToTransportTime(step)}',`)
      samplerPartNoteCode.push(`    noteName: '${note}',`)
      // prettier-ignore
      samplerPartNoteCode.push(`    duration: '${this.transformToDuration(duration)}',`)
      samplerPartNoteCode.push('    velocity: 1')
      samplerPartNoteCode.push('  }')

      samplerPartCode.push(samplerPartNoteCode.join('\r\n'))

      stepCounter++
    })

    if (stepCounter > 0) {
      return samplerPartCode.join(',\r\n')
    } else {
      return '  // Здесь пока нет секвенции'
    }
  }

  generateCodeExample = () => {
    const { loopDuration } = this.state
    // prettier-ignore
    return `// Подключаем библиотеку Tone.js
import * as Tone from 'tone'

// Создаём синтезатор и подключаем к колонкам
const synth = new Tone.Synth().toDestination()

// Описываем секвеницию в формате массива из объектов,
// в каждом их которых мы можем указать ноту, длительность,
// время, когда воспоизводить ноту, и громкость
const sequence = [
${this.generatePartCode()}
]

// Создаём партию, добавляем в неё секвенцию
// и включаем проигрывание
const part = new Tone.Part((time, note) => {
  synth.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity
  )
}, sequence).start(0)

// Указываем длительность партии
part.loopEnd = '${loopDuration}m'

// Включаем зацикливание
part.loop = true

// Включаем звук в браузере
sampler.context.resume()

// Включаем отсчёт времени в Tone.js
Tone.Transport.start()
`
  }

  render() {
    const {
      created,
      playing,
      ticksPlayed,
      loopDuration,
      stepDuration,
      sequence,
      stepWidth
    } = this.state

    {
      created ? this.updatePart() : ''
    }

    return (
      <div className="MOD_MelodySequencer">
        <M_InstrumentHeaderWithButton
          text="Melody Sequencer"
          isOn={playing}
          handleClick={this.handlePlayClick}
        />

        <O_NoteSequencer
          octaves={8}
          loopDuration={loopDuration}
          stepDuration={stepDuration}
          ticksPlayed={ticksPlayed}
          sequence={sequence}
          stepWidth={stepWidth}
          handleNoteClick={this.handleNoteClick}
          handleStepClick={this.handleStepClick}
          handleStepMouseDown={this.handleStepMouseDown}
          handleStepMouseMove={this.handleStepMouseMove}
          handleStepMouseUp={this.handleStepMouseUp}
          handleSequenceStepClick={this.handleSequenceStepClick}
        />

        <A_InstrumentConnectionArrow />
        <M_InstrumentHeader text="Tone Synth" />

        <M_CodeExample code={this.generateCodeExample()} />
      </div>
    )
  }
}

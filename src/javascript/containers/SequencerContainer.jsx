import * as Tone from 'tone'
import { instrument } from '../tunes/sequenced_synth.js'

import React, { PureComponent } from 'react'

import WelcomeScreen from '../views/WelcomeScreen.jsx'
import SequencerModule from '../views/SequencerModule.jsx'

export default class SequencerContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: [],
      togglePlay: false
    }
  }

  componentDidMount() {
    this.initInstruments()
    console.log('/// Instruments have been initialized ///')
  }

  startWebAudio = async () => {
    await Tone.start()

    this.setState({
      webAudioStarted: true
    })
  }

  playSequence = () => {
    let { togglePlay, webAudioStarted } = this.state

    if (webAudioStarted === false) {
      this.startWebAudio()
    }

    if (togglePlay == false) {
      Tone.Transport.start()
      this.setState({
        togglePlay: !togglePlay
      })
    } else {
      Tone.Transport.stop()
      this.setState({
        togglePlay: !togglePlay
      })
    }
  }

  initInstruments = () => {
    Tone.Transport.bpm.value = 120
    const instruments = [instrument]

    this.setState({ instruments })
  }

  handlePropertyValueChange = (id, property, value) => {
    console.log(property, value)
    const instruments = []

    this.state.instruments.forEach((instrument, i) => {
      const newInstrument = []

      instrument.forEach((instrumentModule, i) => {
        const newInstrumentModule = Object.assign({}, instrumentModule)

        if (instrumentModule.id === id) {
          if (property.length === 1) {
            const propertyName = property[0]
            newInstrumentModule.settings[propertyName] = value
          } else if (property.length === 2) {
            const scopeName = property[0]
            const propertyName = property[1]
            newInstrumentModule.settings[scopeName][propertyName] = value
          } else if (property.length === 3) {
            let searchedEvent

            newInstrumentModule.settings.sequence.forEach((event, i) => {
              if (
                event.noteName === property[0] &&
                event.time === property[1]
              ) {
                searchedEvent = event
                newInstrumentModule.settings.sequence.splice(i, 1)
              }
            })

            if (searchedEvent === undefined) {
              newInstrumentModule.settings.sequence.push({
                time: property[1],
                noteName: property[0],
                duration: '1n',
                velocity: 1
              })
            }
          }
        }

        newInstrument.push(newInstrumentModule)
      })

      instruments.push(newInstrument)
    })

    this.setState({
      instruments
    })
  }

  renderSequencerRoom = () => {
    return (
      <SequencerModule
        instrument={instrument[0]}
        handlePropertyValueChange={this.handlePropertyValueChange}
        handlePlaySequence={this.playSequence}
        togglePlay={this.state.togglePlay}
      />
    )
  }

  render() {
    const { webAudioStarted } = this.state

    return (
      <div className="SequencerContainer">{this.renderSequencerRoom()}</div>
    )
  }
}

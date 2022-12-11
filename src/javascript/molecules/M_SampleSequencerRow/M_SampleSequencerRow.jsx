import './M_SampleSequencerRow.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_SampleSequencerStep from '../../atoms/A_SampleSequencerStep/A_SampleSequencerStep.jsx'

export default class M_SampleSequencerRow extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name.replaceAll('-', ' ')
    }
  }

  renderSampleSequencerSteps = () => {
    const { note, sequence, ticksPlayed, handleClick } = this.props
    const elements = []

    ;(16).times((i) => {
      elements.push(
        <A_SampleSequencerStep
          isOn={sequence.includes(i)}
          currentStep={ticksPlayed === i ? true : false}
          handleClick={() => {
            handleClick(note, i)
          }}
          key={i}
        />
      )
    })

    return elements
  }

  render() {
    const { name } = this.state

    return (
      <div className="M_SampleSequencerRow">
        <div className="name">{name}</div>

        <div className="W_SampleSequencerRowSteps">
          {this.renderSampleSequencerSteps()}
        </div>
      </div>
    )
  }
}
